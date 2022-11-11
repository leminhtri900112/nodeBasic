import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./router/web";
import connection from "./configs/connectDB";
require("dotenv").config();
const app = express();
const port = process.env.PORT;

// setting view engine
configViewEngine(app);

// init web route
initWebRouter(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
