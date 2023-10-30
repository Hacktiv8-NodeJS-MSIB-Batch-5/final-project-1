const { db } = require("../config/db.config");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

exports.register = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;
  const hashedPassword = hashPassword(password);
  console.log(email);
  await db.query(`select * from users where email = $1`, [email])
  .then(async (account) => {
    if (account.rowCount != 0){
      return res.status(400).json({message: "Email already used!"});
    }
    await db.query(`insert into users (email, password) values ($1, $2) returning id as id, email as email`, [email, hashedPassword])
      .then((data) => {
        data = data.rows[0];
        // console.log(data);
        res.status(201).json({
          id: data.id,
          email: data.email,
        })
      })
      .catch((e) => {
        res.status(500).json({error: "An error occured while attempting to register", message: e.message});
      })
  })
  .catch((e) => {
    console.log(e);
    res.status(500).json({error: "An error occured while attempting to register", message: e.message});
  })
}

exports.login = async (req, res) => {
  const body = req.body;
  const email = body.email;
  const password = body.password;

  await db.query(`select * from users where email = $1`, [email])
  .then(async (account) => {
    account = account.rows;
    if (account.length == 1 && comparePassword(password, account[0].password)){
      const token = generateToken(account[0]);
      res.status(200).json({access_token: token});
    }
    else{
      res.status(401).json({message: "Email or password invalid!"});
    }
  })
  .catch((e) => {
    res.status(500).json({error: "An error occured while attempting to log in", message: e.message});
  })
}