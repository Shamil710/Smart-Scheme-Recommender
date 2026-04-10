import pool from "../config/db.js";


// Function to save a scheme for a user
export const saveScheme = async (userId, schemeId) => {
 

    try{
      const result = await pool.query(
        `select * from saved_schemes 
        where user_id = $1 and scheme_id = $2`
        , [userId, schemeId]);

      if(result.rows.length > 0){
        throw new Error("Scheme already saved");
      }
      const saveResult = await pool.query(

        `insert into saved_schemes 
        (user_id, scheme_id) 
        values ($1, $2) returning *`, 
        [userId, schemeId]);

      return saveResult.rows[0];

    }catch(error){
      throw error;
    }
};

// Function to get saved schemes for a user
export const getSavedSchemes = async (userId) => {
  const result = await pool.query(

    `SELECT s.* FROM saved_schemes ss
    JOIN schemes s ON ss.scheme_id = s.id
    WHERE ss.user_id = $1`,
    [userId]
  );

  return result.rows;
};

// Function to delete a saved scheme for a user
export const deleteSavedScheme = async (userId, schemeId) => {
  await pool.query(
    `DELETE FROM saved_schemes
    WHERE user_id = $1 AND scheme_id = $2`,
    [userId, schemeId]
  );
};


