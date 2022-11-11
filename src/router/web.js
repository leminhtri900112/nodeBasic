import express from "express";
import { getHomePage, getUserId } from "../controller/homeController";

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/", getHomePage);

  router.get("/detail/user/:id", getUserId);

  return app.use("/", router);
};

export default initWebRouter;
