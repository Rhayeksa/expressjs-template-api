require("dotenv").config({ path: "./.env" });
const { sequelize, Sequelize } = require("../../../config/db");
const { dateTimeNow } = require("../../../utils/dateTimeNow");
const { response } = require("../../../utils/response");
const db_name = process.env.DB_NAME;

exports.insertOneTb1 = async (req, res) => {
  // #swagger.tags = ['Module 1']
  const t = await sequelize.transaction();
  let { date, time, datetime, email, number, password, tel, text } = req.body;
  let data;
  try {
    // date validasi
    if (
      !String(date).match(
        /^(\d{4})-(([1-9]|1[012]))-(\b([1-9]|[12][0-9]|3[0-1])\b)$/
      )
    ) {
      return await response({
        res: res,
        code: 400,
        msg: "Date tidak valid, contoh date : 2024-12-31",
      });
    }

    // time validasi
    if (!String(time).match(/^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/)) {
      return await response({
        req,
        res,
        code: 400,
        msg: "Time tidak valid, contoh time : 23:59",
      });
    }

    data = await sequelize.query(
      `
      INSERT INTO ${db_name}.tb_1_master(c_date, c_time, c_datetime, c_email, c_number, c_password, c_tel, c_text, created_at, updated_at)
      VALUES($date, $time, $datetime, $email, $number, $password, $tel, $text, $createdAt, $updatedAt)
      `,
      {
        type: Sequelize.QueryTypes.INSERT,
        transaction: t,
        bind: {
          date: date,
          time: time,
          datetime: datetime,
          email: email,
          number: number,
          password: password,
          tel: tel,
          text: text,
          createdAt: String(dateTimeNow),
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
