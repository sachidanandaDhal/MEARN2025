const express = require('express');
require("dotenv").config();
const app = express();
const path = require('path');
const router = require('./router/auth-router');
app.use(express.json());
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

app.use("/api/auth", router);

app.use(errorMiddleware)

const port = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});


