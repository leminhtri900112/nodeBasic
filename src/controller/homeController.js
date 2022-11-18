import multer from "multer";
import pool from "../configs/connectDB";

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.render("index.ejs", { dataUser: JSON.stringify(rows) });
};

let getUserId = async (req, res) => {
  let userId = req.params.id;

  const [rows, fields] = await pool.execute(
    `SELECT * FROM users where id = ?`,
    [userId]
  );
  return res.send(JSON.stringify(rows));
};

let createUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    `INSERT INTO users(firsname, lastname, email, address) values (?, ?, ?, ?)`,
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let { deleteUser } = req.body;
  await pool.execute(`DELETE FROM users WHERE id = ?`, [deleteUser]);
  return res.redirect("/");
};

let editUserPage = async (req, res) => {
  let userId = req.params.id;
  const [rows, fields] = await pool.execute(
    `SELECT * FROM users where id = ?`,
    [userId]
  );
  return res.render("editForm.ejs", { dataUser: JSON.stringify(rows[0]) });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  //console.log("check>>>>>>>>>>", req.body);
  await pool.execute(
    `UPDATE users
    SET firsname = ?, lastname = ?, email = ?,  address = ?
    WHERE id = ?;`,
    [firstName, lastName, email, address, id]
  );

  return res.redirect("/");
};

let getUploadFile = (req, res) => {
  return res.render("uploadFile.ejs");
};

const upload = multer().single("profile_pic");
let handleUploadFile = async (req, res) => {
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`
    );
  });
};

module.exports = {
  getHomePage,
  getUserId,
  createUser,
  deleteUser,
  editUserPage,
  updateUser,
  getUploadFile,
  handleUploadFile,
};
