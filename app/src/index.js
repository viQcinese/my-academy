const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.DATABASE_HOSTNAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_USER_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
