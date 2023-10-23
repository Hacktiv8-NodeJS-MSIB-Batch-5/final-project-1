const { verifyToken } = require('../helpers/jwt');
const { db } = require("../config/db.config");

const authentication = async (req, res, next) => {
  const header = req.headers["authorization"];
  
  try{
    const token = header.split(" ")[1];
    const decode = verifyToken(token);
    // console.log(decode);
    await db.query(`select * from users where email = $1`, [decode.email])
      .then((user) => {
        if (user.rowCount == 0){
          throw {
            code: 401,
            message:  "Unauthorized",
          }
        }
        req.userData= user.rows[0];
        next();
      })
      .catch((e) => {
        return res.status(e.code || 500).json(e);
      })
  } catch (e) {
    res.status(401).json({message: "Unauthorized"});
  }
}

module.exports = {
  authentication
};