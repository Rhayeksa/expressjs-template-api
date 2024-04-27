require("dotenv").config({ path: "./.env" });
const { sequelize, Sequelize } = require("../../../config/db");
const { response } = require("../../../utils/response");
const { pagination } = require("../../../utils/pagination");
const { dateTimeNow } = require("../../../utils/dateTimeNow");
const db_name = process.env.DB_NAME;

exports.getAllTb1 = async (req, res) => {
  // #swagger.tags = ['Module 1']
  console.log(dateTimeNow);
  let size = !req.query.size ? 5 : req.query.size;
  let page = !req.query.page ? 1 : req.query.page;
  let data, totalData;
  const t = await sequelize.transaction();
  try {
    data = await sequelize.query(
      `
      SELECT
      tb_1.tb_1_id AS id
      , DATE_FORMAT(tb_1.c_date, '%Y-%m-%d') AS date
      , tb_1.c_time AS time
      , DATE_FORMAT(tb_1.c_datetime, '%Y-%m-%d %H:%i:%s') AS datetime
      , tb_1.c_email AS email
      , tb_1.c_number AS number
      , tb_1.c_password AS password
      , tb_1.c_tel AS tel 
      , tb_1.c_text AS text
      , DATE_FORMAT(tb_1.created_at, '%Y-%m-%d %H:%i:%s') AS ceated_at
      , DATE_FORMAT(tb_1.updated_at, '%Y-%m-%d %H:%i:%s') AS updated_at
      , DATE_FORMAT(tb_1.deleted_at, '%Y-%m-%d %H:%i:%s') AS deleted_at
      FROM ${db_name}.tb_1_master tb_1
      ORDER BY tb_1.tb_1_id DESC
      LIMIT $limit OFFSET $offset
      `,
      {
        type: Sequelize.QueryTypes.SELECT,
        transaction: t,
        bind: { limit: String(size), offset: String((page - 1) * size) },
      }
    );

    totalData = await sequelize.query(
      `
      SELECT COUNT(1) AS totalData
      FROM ${db_name}.tb_1_master
      `,
      {
        type: Sequelize.QueryTypes.SELECT,
        transaction: t,
      }
    );

    t.commit();
    return await response({
      res: res,
      code: 200,
      page: await pagination({
        pageSize: Number(size),
        currentPage: Number(page),
        totalData: totalData[0]["totalData"],
      }),
      data: data,
    });
  } catch (error) {
    t.rollback();
    console.error(`\n\nError : ${error}\n\n`);
    return await response({ res: res, code: 500 });
  }
};
