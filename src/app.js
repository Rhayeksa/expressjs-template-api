// library
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

// import router
const indexRouter = require("./apis/index");
const usersRouterV1 = require("./apis/users/v1/routes");
const module1RouterV1 = require("./apis/module1/v1/routes");

// define app
const app = express();

// config app
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// router
app.use("/", indexRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/users", usersRouterV1);
app.use("/module-1", module1RouterV1);

module.exports = app;
