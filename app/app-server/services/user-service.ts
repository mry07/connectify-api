import * as HttpStatus from "../../../config/constants/http-status.js";
import { pool } from "../../../config/database.js";
import { Request } from "express";
import { DevError } from "../../../exception/errors/index.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export const details = async (req: Request) => {
  const { sub } = req.jwt;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const sql = `SELECT
      u.id,
      u.name,
      u.username,
      u.email,
      u.avatar,
      r.name role,
      COUNT(DISTINCT f1.id) AS followers,
      COUNT(DISTINCT f2.id) AS following,
      COUNT(DISTINCT p.id) AS posts,
      u.created_at
    FROM
      users u
      INNER JOIN roles r ON r.id = u.role_id
      LEFT JOIN followers f1 ON f1.user_id = u.id
      LEFT JOIN followers f2 ON f2.follower_id = u.id
      LEFT JOIN posts p ON p.user_id = u.id
    WHERE u.id = ?
    GROUP BY u.id`;

    const [rows] = await connection.execute<RowDataPacket[]>(sql, [sub]);

    await connection.commit();

    return { data: rows[0] };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    await connection.release();
  }
};

export const followUnfollow = async (req: Request) => {
  const { sub } = req.jwt;
  const { user_id, follow } = req.body;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    if (user_id == undefined || follow == undefined) {
      throw new DevError(
        HttpStatus.BAD_REQUEST,
        "missing_parameters",
        "Pastikan parameter `user_id` dan `follow` telah kamu kirim"
      );
    }

    if (follow) {
      const sql = `INSERT INTO followers (user_id, follower_id) VALUES (?, ?)`;
      await connection.execute(sql, [user_id, sub]);
    } else {
      const sql = `DELETE FROM followers WHERE user_id = ? AND follower_id = ?`;
      const [rows] = await connection.execute<ResultSetHeader>(sql, [
        user_id,
        sub,
      ]);
      if (!rows.affectedRows) {
        throw new DevError(HttpStatus.NOT_FOUND, "already_unfollowed");
      }
    }

    await connection.commit();
  } catch (error: any) {
    await connection.rollback();

    if (error.code === "ER_DUP_ENTRY") {
      throw new DevError(HttpStatus.BAD_REQUEST, "already_followed");
    }

    throw error;
  } finally {
    await connection.release();
  }
};

export const getPosts = async (req: Request) => {
  const { sub } = req.jwt;
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const sql = `SELECT
      p.id,
      p.user_id,
      u.avatar,
      u.name,
      u.username,
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
    WHERE u.id = ?
    GROUP BY p.id, i.like, i.dislike
    ORDER BY p.id DESC`;
    const [rows] = await connection.execute<RowDataPacket[]>(sql, [sub, sub]);
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
    await connection.release();
  }
};
