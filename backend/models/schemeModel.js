import pool from "../config/db.js";

// Function to get all schemes from the database
export const getAllSchemes = async () => {
  try {
    const result = await pool.query("SELECT * FROM schemes ORDER BY id");
    return result.rows;
  } catch (error) {
    console.error("Error fetching schemes:", error);
    throw error;
  }
};

// Function to get a specific scheme by ID
export const getSchemeById = async (schemeId) => {
  try {
    const result = await pool.query("SELECT * FROM schemes WHERE id = $1", [
      schemeId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching scheme by ID:", error);
    throw error;
  }
};

// Function to get schemes based on filters
export const getFilteredSchemes = async (filters) => {
  const { category, state, search } = filters;

  const result = await pool.query("SELECT * FROM schemes");

  const schemes = result.rows;

  return schemes.filter((scheme) => {
    const matchesCategory =
      !category || scheme.category?.toLowerCase() === category.toLowerCase();

    const matchesState =
      !state || scheme.state?.toLowerCase() === state.toLowerCase();

    const matchesSearch =
      !search ||
      scheme.name?.toLowerCase().includes(search.toLowerCase()) ||
      scheme.description?.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesState && matchesSearch;
  });
};
