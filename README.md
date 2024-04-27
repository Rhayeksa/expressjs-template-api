# Expressjs Template API

Project ini dibuat sebagai referensi dalam pembuatan Rest API yang merupakan Backend App menggunakan Expressjs sebagai framework-nya.

## Technology

```console
NodeJs (18.17.1)           : Interpreter
ExpressJs (4.16.1)         : Framework
Mysql (8.0.34)             : Database
Sequelize (6.37.2)         : ORM
bcryptjs (2.4.3)           : Encrypt dan Decrypt password user
cookie-parser (1.4.4)      : middleware untuk parsing cookie
swagger-ui-express (5.0.0) : Documentation API
swagger-autogen (2.23.7)   : Generator swagger file
debug (2.6.9)              : Debugger yang bisa dilihat pada console(terminal)
dotenv (16.4.5)            : Environment variabel
jsonwebtoken (9.0.2)       : Generator token untuk men-verify request
morgan (1.9.1)             : Log HTTP request yang dapat dilihat pada console(terminal)
mysql2 (3.9.4)             : Driver untuk melakukan request data ke database Mysql
nodemon (3.1.0)            : pe-restart aplikasi setiap ada perubahan
```

## Run Local Server dengan docker

```bash
docker-compose up -d --build
```

## TODO

1. Merubah enpoint menjadi v1/module_name
