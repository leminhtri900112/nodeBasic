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

module.exports = {
  getHomePage,
  getUserId,
  createUser,
  deleteUser,
  editUserPage,
  updateUser,
};
