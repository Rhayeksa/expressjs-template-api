require("dotenv").config({ path: "./.env" });
const { hashSync } = require("bcryptjs");
const { sequelize, Sequelize } = require("../../../config/db");
const { response } = require("../../../utils/response");
const { dateTimeNow } = require("../../../utils/dateTimeNow");
const db_name = process.env.DB_NAME;

exports.register = async (req, res) => {
  // #swagger.tags = ['User']
  const t = await sequelize.transaction();
  try {
    let { username, password } = req.body;
    let data;

    data = await sequelize.query(
      `
      SELECT COUNT(1) userExist
      FROM ${db_name}.users
      WHERE username = $username
      `,
      {
        type: Sequelize.QueryTypes.SELECT,
        transaction: t,
        bind: { username: username },
      }
    );
    if (data[0]["userExist"] !== 0) {
      t.rollback();
      return await response({
        res: res,
        code: 400,
        msg: "User already exists",
      });
    }

    data = await sequelize.query(
      `
      INSERT INTO ${db_name}.users(username, password, created_at, updated_at)
      VALUES($username, $password, $createdAt, $updatedAt)
      `,
      {
        type: Sequelize.QueryTypes.INSERT,
        transaction: t,
        bind: {
          username: username,
          password: hashSync(password, 8),
          createdAt: dateTimeNow,
          updatedAt: dateTimeNow,
        },
      }
    );

    t.commit();
    return await response({ res: res, code: 201 });
  } catch (error) {
    t.rollback();
    console.error(`\n\nError : ${error}\n\n`);
    return await response({ res: res, code: 500 });
  }
};
