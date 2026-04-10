import pool from "../config/db.js";


// Add new scheme function by admin
export const addScheme = async (schemeData) => {
    try {   
        const {
        name,
        description,
        min_age,
        max_age,
        income_limit,
        occupation,
        category,
        state, gender,
        benefits,
        documents,
        apply_link,
        ministry,
        beneficiary_category
    } = schemeData; 

        const result = await pool.query(
      `INSERT INTO schemes 
      (name, description, min_age, max_age, income_limit, occupation, 
      category, state, gender,benefits, documents, apply_link,
      ministry, beneficiary_category)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      RETURNING *`,
      [
        name,
        description,
        min_age,
        max_age,
        income_limit,
        occupation,
        category,
        state,
        gender,
        benefits,
        documents,
        apply_link,
        ministry,
        beneficiary_category

      ]
    );

        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Server error");
    }   
};


// read all schemes function for admin dashboard
export const getAllSchemes = async () => {
    try {
        const result = await pool.query("SELECT * FROM schemes");
        return result.rows;
    } catch (error) {
        console.error(error);
        throw new Error("Server error");
    }
};

// get specific scheme by id function for admin dashboard
export const getSchemeById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM schemes WHERE id = $1", [id]);
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Server error");
    }
};

// update scheme function by admin
export const updateScheme = async (id, data) => {
  try {
    const fields = [];
    const values = [];
    let index = 1;

    // loop through only provided fields
    for (let key in data) {
      fields.push(`${key} = $${index}`);
      values.push(data[key]);
      index++;
    }

    // ❗ important check
    if (fields.length === 0) {
      throw new Error("No fields provided to update");
    }

    // add id at last
    values.push(id);

    const query = `
      UPDATE schemes
      SET ${fields.join(", ")}
      WHERE id = $${index}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0];

  } catch (error) {
    console.error(error);
    throw new Error("Patch update failed");
  }
};


// delete scheme function by admin
export const deleteScheme = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM schemes WHERE id = $1 RETURNING *`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error("Server error");
    }
};