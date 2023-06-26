import { Pool } from "../config/database.js";

export const details = async (req) => {
  const { sub } = req.jwt;
  const connection = await Pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      `SELECT
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
      WHERE u.id = 4
      GROUP BY u.id;`,
      [sub]
    );

    await connection.commit();

    return { data: rows[0] };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const follow = async (req) => {
  const { sub } = req.jwt;
  const { user_id } = req.body;
  const connection = await Pool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      `DELETE FROM followers WHERE user_id = ? AND follower_id = ?`,
      [sub, user_id]
    );
    if (!rows.affectedRows) {
      await connection.execute(
        `INSERT INTO followers (user_id, follower_id) VALUES (?, ?)`,
        [sub, user_id]
      );
    }

    await connection.commit();
  } catch (error) {
    console.log(error);
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};
