import connection from "../database.js";
import jwt from "jsonwebtoken";

export const findByEmail = async (email) => {

    const found = await connection.query(
        `SELECT * FROM "users" WHERE "email"=$1`,
        [email]
  );

  return found.rows[0]
}

export const createUser = async (name, email, hashedPassword) => {
    const resp = await connection.query(
        `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
        [name, email, hashedPassword]
    );

    return resp
}

export function verifyToken(token) {
    if (!token) {
        return false
      }
  
      let user;
  
      try {
        user = jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        return false
      }
      return user
}