import express from "express";
import configViewEngine from "./configs/viewEngine";
const app = express();
const port = 3000;

configViewEngine(app);
app.get("/", (req, res) => {
  res.render("index.ejs");
  // res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/about", (req, res) => {
  res.send(`I'm MinhTri`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
