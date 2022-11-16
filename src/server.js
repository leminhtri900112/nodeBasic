import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRouter from "./router/web";
import initUserAPI from "./router/webAPI";
import connection from "./configs/connectDB";
require("dotenv").config();
const app = express();
const port = process.env.PORT;
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// setting view engine
configViewEngine(app);

// init web route
initWebRouter(app);

// init webAPI
initUserAPI(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
