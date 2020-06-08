import express from "express";
import nunjucks from "nunjucks";

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
  return res.render("search-results.html");
});

server.listen(3000);