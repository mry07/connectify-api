import DB from "../database.js";
import ApiError from "../errors/api-error.js";
import { saveToUploads } from "../utils/image.js";
import { httpStatus } from "../utils/http-status.js";
import DevError from "../errors/dev-error.js";

export const newPost = async (req) => {
  const { sub } = req.jwt;
  const { content } = req.body;
  const connection = await DB.getConnection();

  try {
    await connection.beginTransaction();

    if (!content && !req.files.length) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Konten atau Foto tidak boleh kosong"
      );
    }

    const images = await saveToUploads(req, "/posts");

    // membuat post baru
    const [{ insertId: postId }] = await connection.execute(
      "INSERT INTO posts (user_id, content) VALUES (?, ?)",
      [sub, content]
    );

    if (images.length) {
      // membuat post images baru
      await connection.execute(
        "INSERT INTO post_images (post_id, image, blurhash) VALUES ?",
        [images.map((e) => [postId, e.filename, e.blurhash])]
      );
    }

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getPosts = async (req) => {
  const appId = req.headers["app-id"];
  const connection = await DB.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      `SELECT
        p.id,
        p.user_id,
        u.name,
        u.username,
        COALESCE(sub_i2.like, 0) is_liked,
        COALESCE(sub_i2.dislike, 0) is_disliked,
        COALESCE(sub_i1.likes, 0) likes,
        COALESCE(sub_i1.dislikes, 0) dislikes,
        p.content post_content,
        IF(
          COUNT(pi.image) = 0,
          JSON_ARRAY(),
          JSON_ARRAYAGG(
            JSON_OBJECT('image', pi.image, 'blurhash', pi.blurhash)
          )
        ) post_images
      FROM
        posts p
        LEFT JOIN users u ON u.id = p.user_id
        LEFT JOIN post_images pi ON pi.post_id = p.id
        LEFT JOIN (
          SELECT
            post_id,
            SUM(\`like\`) likes,
            SUM(dislike) dislikes
          FROM
            interactions
          GROUP BY
            post_id
        ) sub_i1 ON sub_i1.post_id = p.id
        LEFT JOIN (
          SELECT
            post_id,
            \`like\`,
            dislike
          FROM
            interactions
          WHERE
            user_id IN (
              SELECT
                user_id
              FROM
                user_sessions
              WHERE
                app_id = ?
            )
        ) sub_i2 ON sub_i2.post_id = p.id
      GROUP BY
        p.id,
        sub_i2.like,
        sub_i2.dislike
      ORDER BY p.id DESC`,
      [appId]
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

export const likeDislike = async (req) => {
  const { sub } = req.jwt;
  const { post_id, like, dislike } = req.body;
  const connection = await DB.getConnection();

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

export const comment = async (req) => {
  const { sub } = req.jwt;
  const { post_id, comment } = req.body;
  const connection = await DB.getConnection();

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

export const getComments = async (req) => {
  const { post_id, pagination } = req.body;
  const connection = await DB.getConnection();

  try {
    await connection.beginTransaction();

    if (
      pagination === undefined ||
      pagination.limit === undefined ||
      pagination.last_id === undefined
    ) {
      throw new DevError(
        httpStatus.BAD_REQUEST,
        "missing_parameters",
        "Pastikan parameter `pagination.next` dan `pagination.limit` telah kamu kirim"
      );
    }

    let params = [post_id];
    let sql = `
      SELECT
        c.id,
        c.user_id,
        u.name,
        u.username,
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

    const [rows] = await connection.execute(sql, params);
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
