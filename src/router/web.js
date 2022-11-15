import express from "express";
import {
  getHomePage,
  getUserId,
  createUser,
  deleteUser,
  editUserPage,
  updateUser,
} from "../controller/homeController";

let router = express.Router();

let initWebRouter = (app) => {
  router.get("/", getHomePage);
  router.get("/detail/user/:id", getUserId);
  router.post("/create-new-user", createUser);
  router.post("/delete-user", deleteUser);
  router.get("/edit-user/:id", editUserPage);
  router.post("/update-user", updateUser);

  return app.use("/", router);
};

export default initWebRouter;
