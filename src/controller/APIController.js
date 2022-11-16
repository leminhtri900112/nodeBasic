import pool from "../configs/connectDB";
let getUserAPI = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  return res.status(200).json({
    message: "get-user-ok",
    dataUser: rows,
  });
};

let createUserAPI = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    `INSERT INTO users(firsname, lastname, email, address) values (?, ?, ?, ?)`,
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: "create-user-ok",
  });
};

let editUserAPI = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;

  await pool.execute(
    ` UPDATE users 
      SET firsname = ?, lastname = ?, email = ?, address = ?
      WHERE id = ?`,
    [firstName, lastName, email, address, id]
  );

  return res.status(200).json({
    message: "update-user-ok",
  });
};

let deleteUserAPI = async (req, res) => {
  let { id } = req.params;
  await pool.execute(`DELETE FROM users WHERE id= ?`, [id]);

  return res.status(200).json({
    message: "delete-user-ok",
  });
};

module.exports = {
  getUserAPI,
  createUserAPI,
  editUserAPI,
  deleteUserAPI,
};
