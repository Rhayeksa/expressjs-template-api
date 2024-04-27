const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Expressjs Template API",
    description:
      "Project ini dibuat sebagai referensi dalam pembuatan Rest API yang merupakan Backend App menggunakan Expressjs",
  },
  host: "",
  schemes: [],
};

const outputFile = "./swagger-output.json";
const routes = ["./app.js"];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
