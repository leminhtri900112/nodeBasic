import connection from "../configs/connectDB";
let getHomePage = (req, res) => {
  //logic
  let data = [];
  connection.query("SELECT * FROM `users`", function (err, results, fields) {
    console.log(">>>get DB");
    console.log(results); // results contains rows returned by server
    data = results.map((row) => {
      return row;
    });
    //console.log(fields); // fields contains extra meta data about results, if available
    return res.render("index.ejs", { dataUser: JSON.stringify(data) });
  });
};

module.exports = {
  getHomePage,
};
