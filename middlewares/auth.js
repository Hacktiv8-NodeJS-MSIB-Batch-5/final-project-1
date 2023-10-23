const { verifyToken } = require('../helpers/jwt');
const { db } = require("../config/db.config");

const authentication = async (req, res, next) => {
  const header = req.headers["Authorization"];
  console.log(header);
  
  const token = header.split(" ")[1];
  try{
    const decode = verifyToken(token);
    await db.query(`select * from users where email = $1`, [email])
      .then((user) => {
        if (!user){
          throw {
            code: 401,
            message: `User with id ${decode.id} not found in database`,
          }
        }
        req.userData= user.dataValues;
        next();
      })
      .catch((e) => {
        return res.status(e.code || 500).json(e);
      })
  } catch (e) {
    res.status(401).json(e);
  }
}

module.exports = {
  authentication
};