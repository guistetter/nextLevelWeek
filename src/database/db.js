const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

db.serialize(() => {
  //criar tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS places(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT, 
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
  `); //fim criar tabela
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
    "https://i.pinimg.com/originals/e4/34/2a/e4342a4e0e968344b75cf50cf1936c09.jpg",
    "Colectoria",
    "Guilherme, jardim america",
    "numero 26",
    "sao paulo",
    "sao paulo",
    "residuos eletronicos, lampadas",
  ];

  function afterInsertData(err) {
    if (err) {
      return err;
    }
    console.log("cadastrado com sucesso");
    console.log(this);
  }
  //db.run(query, values, afterInsertData);
  //fim inserir dados

  //inicio delete
  db.run(`DELETE FROM places WHERE id = ?`, [1], function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log("Deletedo com sucesso");
  });

  //inicio consultas
  db.all(`SELECT name FROM places WHERE id = 1`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log("Aqui estao seus registros");
    console.log(rows);
  });
});
