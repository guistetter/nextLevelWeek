import express from "express";
import nunjucks from "nunjucks";
import db from "./database/db";
const server = express();
server.use(express.static("public"));

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index.html", { title: "titulo" });
});
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});
server.get("/search", (req, res) => {
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length;

    return res.render("search-results.html", { places: rows, total: total });
  });
});

server.listen(3000);
