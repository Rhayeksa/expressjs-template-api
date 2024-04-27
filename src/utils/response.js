const { STATUS_CODES } = require("http");

exports.response = async ({ req, res, code, msg, page, data }) => {
  let result = {
    datetime: new Date(Date.now()).toString({
      timeZone: "Asia/Jakarta",
    }),
    code: code,
    status: STATUS_CODES[code],
    message: !msg ? STATUS_CODES[code] : msg,
  };
  if (page) {
    result["page"] = page;
  }
  if (data) {
    result["data"] = data;
  }

  return res.status(code).send(result);
};
