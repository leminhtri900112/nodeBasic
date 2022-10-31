import express from "express";
import { getHomePage } from "../controller/homeController";

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/", getHomePage);

  router.get("/about", (req, res) => {
    res.send(`I'm MinhTri`);
  });

  return app.use("/", router);
};

export default initWebRouter;
