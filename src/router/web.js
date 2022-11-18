import express from "express";
import {
  getHomePage,
  getUserId,
  createUser,
  deleteUser,
  editUserPage,
  updateUser,
  getUploadFile,
  handleUploadFile,
} from "../controller/homeController";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");

let router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appRoot + "/src/public/images/");
  },
  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

// 'profile_pic' is the name of our file input field in the HTML form
let upload = multer({ storage: storage, fileFilter: imageFilter });

let initWebRouter = (app) => {
  router.get("/", getHomePage);
  router.get("/detail/user/:id", getUserId);
  router.post("/create-new-user", createUser);
  router.post("/delete-user", deleteUser);
  router.get("/edit-user/:id", editUserPage);
  router.post("/update-user", updateUser);
  router.get("/upload", getUploadFile);
  router.post(
    "/upload-profile-pic",
    upload.single("profile_pic"),
    handleUploadFile
  );

  return app.use("/", router);
};

export default initWebRouter;
