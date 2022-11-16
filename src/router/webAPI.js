import express from "express";
import {
  getUserAPI,
  createUserAPI,
  editUserAPI,
  deleteUserAPI,
} from "../controller/APIController";

let router = express.Router();

let initUserAPI = (app) => {
  router.get("/allUser", getUserAPI);
  router.post("/create-user", createUserAPI);
  router.put("/update-user", editUserAPI);
  router.delete("/delete-user/:id", deleteUserAPI);

  return app.use("/api/v1", router);
};

export default initUserAPI;
