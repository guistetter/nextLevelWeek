import express from "express";
import nunjucks from "nunjucks";
import db from "./database/db";
const server = express();
server.use(express.static("public"));
//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }));

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index.html", { title: "titulo" });
});

server.get("/create-point", (req, res) => {
  console.log(req.query);
  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  //inserir dados na tabela
  const query = `
  INSERT INTO PLACES(
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?);
  `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.itens,
  ];
  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }
    console.log("cadastrado com sucesso");
    console.log(this);
    return res.render("create-point.html", { saved: true });
  }
  db.run(query, values, afterInsertData);
  //fim inserir dados
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
