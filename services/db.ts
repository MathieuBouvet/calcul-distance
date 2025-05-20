import mysql from "mysql2/promise";

let db: mysql.Connection;

async function getDb() {
  if (db == null) {
    db = await mysql.createConnection({
      host: "localhost",
      user: "admin",
      password: "password",
      database: "db-distance-lucas",
    });
  }
  return db;
}

export default getDb;
