// src/lib/db.js
import mysql from "mysql2/promise";
let connection;
export async function connectToDatabase() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "ems",
    });
  }
  return connection;
}
