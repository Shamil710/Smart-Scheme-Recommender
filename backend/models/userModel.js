import pool from "../config/db.js";


// create user function
export const createUser = async (user) => {
  const { name, email, password, age, income, occupation, category, state } = user;

  const result = await pool.query(
    `INSERT INTO users 
    (name, email, password, age, income, occupation, category, state)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [name, email, password, age, income, occupation, category, state]
  );

  return result.rows[0];
};

// find user by email function
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0];
};


// find user by id function
export const findUserById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );

  return result.rows[0];
}


// update user profile function
export const updateUserProfile = async (userId, updatedData) => {
  try {
    const { age, income, occupation, category, state } = updatedData;

    const result = await pool.query(
      `UPDATE users
       SET age = $1,
           income = $2,
           occupation = $3,
           category = $4,
           state = $5
       WHERE id = $6
       RETURNING id, name, email, age, income, occupation, category, state`,
      [age, income, occupation, category, state, userId]
    );

    return result.rows[0];

  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};


