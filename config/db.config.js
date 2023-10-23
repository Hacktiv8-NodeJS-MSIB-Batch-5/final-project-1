require("dotenv").config();

const Pool = require("pg").Pool

const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

// Tabel User
const createUserTable = async () => {
  const queryText = `CREATE TABLE
    Users(
      id UUID PRIMARY KEY,
      email VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL
    )`;

  await db.query(queryText)
    .then((res) => {
      console.log("create user table", res);
    })
    .catch((e) => {
      console.log("db user", e);
    });
};

// Tabel Reflection
const createReflectionTable = async () => {
  const queryText = `CREATE TABLE
    Reflections(
      id UUID PRIMARY KEY,
      success TEXT NOT NULL,
      low_point TEXT NOT NULL,
      take_away TEXT NOT NULL,
      created_at TIMESTAMP,
      updated_at TIMESTAMP,
      UserId UUID NOT NULL REFERENCES Users(id) ON DELETE CASCADE
    )`;

  await db.query(queryText)
    .then((res) => {
      console.log("create reflection table",res);
      // db.end();
    })
    .catch((err) => {
      console.log(err);
      // db.end();
    });
};

// Create Table
const createTable = async () => {
  try{
    await createUserTable();
    await createReflectionTable();
  } catch (e) {
    console.log("create table", e);
  }
  
}

module.exports = {
  db,
  createUserTable,
  createReflectionTable,
  createTable
}