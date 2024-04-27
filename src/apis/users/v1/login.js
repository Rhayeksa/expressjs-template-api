require("dotenv").config({ path: "./.env" });
const { compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { sequelize, Sequelize } = require("../../../config/db");
const { response } = require("../../../utils/response");
const { secret } = require("../../../config/secret");
const db_name = process.env.DB_NAME;

exports.login = async (req, res) => {
  // #swagger.tags = ['User']
  const t = await sequelize.transaction();
  try {
    let { username, password } = req.body;
    let data;

    data = await sequelize.query(
      `
      SELECT user_id, username, password
      FROM ${db_name}.users
      WHERE username = $username
      `,
      {
        type: Sequelize.QueryTypes.SELECT,
        transaction: t,
        bind: { username: username },
      }
    );
    if (data.length === 0) {
      t.rollback();
      return await response({
        res: res,
        code: 404,
        msg: "User not registered",
      });
    } else if (!compareSync(password, data[0]["password"])) {
      t.rollback();
      return await response({
        res: res,
        code: 401,
        msg: "Incorrect username or password",
      });
    }

    data = sign(
      { user_id: data[0]["user_id"], username: data[0]["username"] },
      secret,
      {
        expiresIn: "1h",
      }
    );

    t.commit();
    return await response({
      res: res,
      code: 200,
      data: {
        user_id: data[0]["user_id"],
        username: data[0]["username"],
        accessToken: data,
      },
    });
  } catch (error) {
    t.rollback();
    console.error(`\n\nError : ${error}\n\n`);
    return await response({ res: res, code: 500 });
  }
};
