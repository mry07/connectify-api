import ApiError from "../../../error/api-error";
import DevError from "../../../error/dev-error";
import { pool } from "../../../config/database";
import { Request } from "express";
import { storeImage } from "../../../utils/image";
import { httpStatus } from "../../../config/constants/http";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const newPost = async (req: Request) => {
  const { sub } = req.jwt;
  const { content } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (!content && !req.files?.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Konten atau Foto tidak boleh kosong"
      );
    }

    const images = await storeImage(req, "/posts");

    // insert new post
    const [{ insertId: postId }] = await connection.execute<ResultSetHeader>(
      "INSERT INTO posts (user_id, content) VALUES (?, ?)",
      [sub, content]
    );

    if (images.length) {
      const params = images.map((e) => [postId, e.filename, e.blurhash]);
      const placeholders = params.map(() => "(?, ?, ?)").join(", ");
      const sql = `INSERT INTO post_images (post_id, image, blurhash) VALUES ${placeholders}`;

      // insert new post images
      await connection.execute(sql, params.flat());
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getPosts = async (req: Request) => {
  const { sub } = req.jwt;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT
        p.id,
        p.user_id,
        u.avatar,
        u.name,
        u.username,
        IF(f.user_id IS NULL, 0, 1) AS is_followed,
        COALESCE(i.like, 0) AS is_liked,
        COALESCE(i.dislike, 0) AS is_disliked,
        COALESCE(sub_i.likes, 0) AS likes,
        COALESCE(sub_i.dislikes, 0) AS dislikes,
        p.content AS post_content,
        IF(COUNT(pi.image) = 0, JSON_ARRAY(), JSON_ARRAYAGG(JSON_OBJECT('image', pi.image, 'blurhash', pi.blurhash))) AS post_images,
        p.created_at
      FROM posts p
      INNER JOIN users u ON u.id = p.user_id
      LEFT JOIN post_images pi ON pi.post_id = p.id
      LEFT JOIN (
        SELECT
          post_id,
          SUM(\`like\`) AS likes,
          SUM(dislike) AS dislikes
        FROM interactions
        GROUP BY post_id
      ) sub_i ON sub_i.post_id = p.id
      LEFT JOIN interactions i ON i.post_id = p.id AND i.user_id = ?
      LEFT JOIN followers f ON f.user_id = u.id AND f.follower_id = ?
      GROUP BY p.id, i.like, i.dislike
      ORDER BY p.id DESC`,
      [sub, sub]
    );

    const posts = [];

    for (const row of rows) {
      posts.push({
        ...row,
        is_liked: Boolean(row.is_liked),
        is_disliked: Boolean(row.is_disliked),
        likes: Number(row.likes),
        dislikes: Number(row.dislikes),
      });
    }

    await connection.commit();

    return { data: posts };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const likeDislike = async (req: Request) => {
  const { sub } = req.jwt;
  const { post_id, like, dislike } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (post_id == undefined || like == undefined || dislike == undefined) {
      throw new DevError(
        httpStatus.BAD_REQUEST,
        "missing_parameters",
        "Pastikan parameter `post_id`, `like`, dan `dislike` telah kamu kirim"
      );
    }

    if (like && dislike) {
      throw new DevError(
        httpStatus.BAD_REQUEST,
        "invalid_parameters",
        "Pastikan parameter `like` dan `dislike` tidak bernilai TRUE secara bersamaan"
      );
    }

    await connection.execute(
      `INSERT INTO interactions (user_id, post_id, \`like\`, dislike) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE \`like\` = ?, dislike = ?`,
      [sub, post_id, like, dislike, like, dislike]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const comment = async (req: Request) => {
  const { sub } = req.jwt;
  const { post_id, comment } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (post_id === undefined) {
      throw new DevError(
        httpStatus.BAD_REQUEST,
        "missing_parameter",
        "Pastikan parameter `post_id` telah kamu kirim"
      );
    }

    await connection.execute(
      `INSERT INTO comments (user_id, post_id, \`comment\`) VALUES (?, ?, ?)`,
      [sub, post_id, comment]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getComments = async (req: Request) => {
  const { post_id, pagination } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    let params = [post_id];
    let sql = `
      SELECT
        c.id,
        c.user_id,
        u.name,
        u.username,
        u.avatar,
        c.comment,
        c.created_at
      FROM
        comments c
        INNER JOIN users u ON u.id = c.user_id
      WHERE
        c.post_id = ?`;

    if (pagination.last_id) {
      params.push(pagination.last_id);
      sql += ` AND c.id < ?`;
    }

    params.push(String(pagination.limit + 1));
    sql += ` ORDER BY c.id DESC LIMIT ?`;

    const [rows] = await connection.execute<RowDataPacket[]>(sql, params);
    if (rows.length < 1) {
      throw new ApiError(httpStatus.NOT_FOUND, "Belum ada komentar");
    }

    const hasMore = rows.length === pagination.limit + 1;
    if (hasMore) {
      rows.pop();
    }

    const lastId = rows[rows.length - 1]?.id || null;

    await connection.commit();

    return { data: rows, lastId, hasMore };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
