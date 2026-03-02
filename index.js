import express from "express";
import axios from "axios";
import pg from "pg";
import "dotenv/config";

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

try {
  await db.connect();
  console.log("DB connected");
} catch (err) {
  console.error(err);
}

app.get("/", async (req, res) => {
  let result = await db.query("select * from books");
  let context = { books: result.rows };
  res.render("./index.ejs", context);
});

app.listen(port, (err) => {
  if (err) console.error(err);
  else console.log(`Server running on port ${port}`);
});
