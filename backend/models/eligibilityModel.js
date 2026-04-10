import pool from "../config/db.js";

export const getEligibleSchemes = async (user) => {
  const { age, income, occupation, category, state, gender } = user;

  const result = await pool.query(
    `
SELECT * FROM schemes
WHERE min_age <= $1
AND (max_age IS NULL OR max_age >= $1)
AND income_limit >= $2

AND (
  LOWER(occupation) = LOWER($3)
  OR occupation IS NULL
)

AND (
  LOWER(beneficiary_category) = LOWER($4)
  OR beneficiary_category = 'all'
)

AND (
  LOWER(state) = LOWER($5)
  OR state = 'central'
)

AND (
  LOWER(gender) = LOWER($6)
  OR gender = 'all'
)
    `,
    [age, income, occupation, category, state, gender],
  );

  return result.rows;
};
