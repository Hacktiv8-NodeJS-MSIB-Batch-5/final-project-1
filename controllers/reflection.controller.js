const { db } = require("../config/db.config");

exports.createReflection = async (req, res) => {
  const body = req.body;
  const success = body.success;
  const low_point = body.low_point;
  const take_away = body.take_away;
  const userid = req.userData.id;
  const createdAt = new Date();
  const updatedAt = new Date();

  // SQL Query to insert new Reflection
  const queryText = `INSERT INTO
    reflections(success, low_point, take_away, userid, createdAt, updatedAt)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`;

  await db.query(queryText, [success, low_point, take_away, userid, createdAt, updatedAt])
    .then((data) => {
      // console.log("data", data);
      data = data.rows[0];
      return res.status(201).json({
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
      res.status(500).json({error: "An error occured while attempting to create reflection", message: e.message});
    })
}

exports.getAllReflections = async (req, res) => {
  try {
    const userId = req.userData.id; //Get the user ID that is currently logged in
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
    const userId = req.userData.id; //Get the user ID that is currently logged in
    const body = req.body;
    const success = body.success;
    const low_point = body.low_point;
    const take_away = body.take_away;
    const updatedAt = new Date();
    
    // Create the SQL query to update the reflection
    const queryText = `
      UPDATE reflections
      SET success = $1, low_point = $2, take_away = $3, updatedAt = $4
      WHERE id = $5 AND userid = $6
      RETURNING *
    `;

    const { rows } = await db.query(queryText, [success, low_point, take_away, updatedAt, reflectionId, userId]);

    if (rows.length === 0) {
      const data = await db.query(`SELECT * FROM reflections WHERE id = $1`, [reflectionId]);
      const isDataExist = (data.rows.length !== 0)
      if ( isDataExist ){
        return res.status(401).json({ message: "Unauthorized" });
      }
      else{
        return res.status(404).json({ message: "Reflection not found." });
      }
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
    const userId = req.userData.id; //Get the user ID that is currently logged in
    // Create the SQL query to delete the reflection
    const queryText = `
      DELETE FROM reflections
      WHERE id = $1 AND userid = $2
      RETURNING *
    `;

    const { rows } = await db.query(queryText, [reflectionId, userId]);

    if (rows.length === 0) {
      const data = await db.query(`SELECT * FROM reflections WHERE id = $1`, [reflectionId]);
      const isDataExist = (data.rows.length !== 0)
      if ( isDataExist ){
        return res.status(401).json({ message: "Unauthorized" });
      }
      else{
        return res.status(404).json({ message: "Reflection not found." });
      }
    }

    return res.status(200).json({ message: "Success delete" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while deleting the reflection." });
  }
}