const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");
module.exports = db;
db.serialize(() => {
  // criar tabela
  //   db.run(`
  //   CREATE TABLE IF NOT EXISTS places(
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     image TEXT,
  //     name TEXT,
  //     address TEXT,
  //     address2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `); //fim criar tabela
  //inserir dados na tabela
  // const query = `
  // INSERT INTO PLACES(
  //   image,
  //   name,
  //   address,
  //   address2,
  //   state,
  //   city,
  //   items
  // ) VALUES (?,?,?,?,?,?,?);
  // `;
  // const values = [
  //   "https://lh3.googleusercontent.com/Nnu166mBPOdjs4umTQH3AtOgKces2xX1vSx7KpCGxi0osWJ3yj9itU75E7X0mCwWpglD4eI=s85",
  //   "Coletoria",
  //   "Guilherme, jardim america",
  //   "numero 26",
  //   "sao paulo",
  //   "sao paulo",
  //   "residuos eletronicos, lampadas",
  // ];
  // function afterInsertData(err) {
  //   if (err) {
  //     return err;
  //   }
  //   console.log("cadastrado com sucesso");
  //   console.log(this);
  // }
  // db.run(query, values, afterInsertData);
  //fim inserir dados
  // inicio consultas
  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log("Aqui estao seus registros");
    console.log(rows);
  });
  //inicio delete
  // db.run(`DELETE FROM places WHERE id = ?`, [18], function (err, rows) {
  //   //db.run(`DELETE FROM places `, function (err, rows) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log("Deletedo com sucesso");
  // });
});
