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

exports.getAllReflections = async (req, res) => {
  try {
    const userId = req.userData.id;
    const queryText = `SELECT * FROM reflections WHERE userid = $1`;

    const { rows } = await db.query(queryText, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No reflections found for this user." });
    }

    return res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while fetching reflections." });
  }
}

exports.updateReflection = async (req, res) => {
  try {
    const reflectionId = req.params.id; // Get the reflection ID from the request params
    const body = req.body;
    const success = body.success;
    const low_point = body.low_point;
    const take_away = body.take_away;
    const updatedAt = new Date();
    
    // Create the SQL query to update the reflection
    const queryText = `
      UPDATE reflections
      SET success = $1, low_point = $2, take_away = $3, updatedAt = $4
      WHERE id = $5
      RETURNING *
    `;

    const { rows } = await db.query(queryText, [success, low_point, take_away, updatedAt, reflectionId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Reflection not found." });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while updating the reflection." });
  }
}

exports.deleteReflection = async (req, res) => {
  try {
    const reflectionId = req.params.id; // Get the reflection ID from the request params

    // Create the SQL query to delete the reflection
    const queryText = `
      DELETE FROM reflections
      WHERE id = $1
      RETURNING *
    `;

    const { rows } = await db.query(queryText, [reflectionId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Reflection not found." });
    }

    return res.status(200).json({ message: "Reflection deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while deleting the reflection." });
  }
}