require("dotenv").config({ path: "./.env" });
const { sequelize, Sequelize } = require("../config/db");

exports.verifyUserAccess = async ({ req, res, acces }) => {
  let data;
  data = await sequelize.query(
    `
    SELECT
      COUNT(1) AS access
    FROM ${DB_NAME}.users_access usr_access
    INNER JOIN ${DB_NAME}.access access ON access.access_id = usr_access.access_id
    WHERE access.name = $name
    AND usr_access.user_id = $userId
    `,
    {
      type: Sequelize.QueryTypes.SELECT,
      bind: { name: String(acces), userId: String(req.userId) },
    }
  );
  return data[0]["access"];
};
