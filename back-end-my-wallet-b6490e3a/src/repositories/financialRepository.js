import connection from "../database.js";

export const createFinancialEvent = async (userId, value, type) => {
    const resp = await connection.query(
        `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
        [userId, value, type]
      );

    return resp
}

export const findByUserId = async (userId) => {
    const events = await connection.query(
        `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
        [userId]
      )

    return events
}

