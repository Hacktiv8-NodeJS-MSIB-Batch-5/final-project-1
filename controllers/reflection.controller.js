const { db } = require("../config/db.config");

exports.createReflection = async (req, res) => {
  const body = req.body;
  const success = body.success;
  const low_point = body.low_point;
  const take_away = body.take_away;
  const userid = req.userData.id;

  // const time = await db.query(`select now()`);
  const createdAt = new Date();
  const updatedAt = new Date();
  const queryText = `insert into
    reflections(success, low_point, take_away, userid, createdAt, updatedAt)
    values($1, $2, $3, $4, $5, $6)
    returning *`;

  console.log(body);
  console.log(userid);
  console.log(createdAt);

  await db.query(queryText, [success, low_point, take_away, userid, createdAt, updatedAt])
    .then((data) => {
      console.log("data", data);
      data = data.rows[0];
      return res.status(200).json({
        id: data.id,
        success: data.success,
        low_point: data.low_point,
        take_away: data.take_away,
        UserId: data.userid,
        createdAt: data.createdat,
        updatedAt: data.updatedat
      });
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(e);
    })
}