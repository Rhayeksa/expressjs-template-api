const d = new Date();

exports.dateTimeNow =
  d.getFullYear(Date.now()) +
  "-" +
  d.getMonth(Date.now()) +
  "-" +
  d.getDate(Date.now()) +
  " " +
  d.getHours(Date.now()) +
  ":" +
  d.getMinutes(Date.now()) +
  ":" +
  d.getSeconds(Date.now());
