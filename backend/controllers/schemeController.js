import {
  saveScheme,
  getSavedSchemes,
  deleteSavedScheme,
} from "../models/savedSchemeModel.js";
import {
  getAllSchemes,
  getSchemeById,
  getFilteredSchemes,
} from "../models/schemeModel.js";

// Controller to handle saving a scheme for a user

export const saveUserScheme = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const { scheme_id } = req.body;

    const saved = await saveScheme(userId, scheme_id);

    res.json({
      message: "Scheme saved successfully",
      data: saved,
    });
  } catch (error) {
    if (error.message === "Scheme already saved") {
      console.warn(error.message);
      return res.status(400).json({ message: error.message });
    }
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to get saved schemes for a user
export const getUserSavedSchemes = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const savedSchemes = await getSavedSchemes(userId);
    console.log("USER ID:", userId);
    console.log("SAVED SCHEMES:", savedSchemes);
    console.log("🔥 PROD USER ID:", req.user.id);
    console.log("🔥 FETCHED FROM DB:", savedSchemes);

    res.json({
      message: "Saved schemes retrieved successfully",
      count: savedSchemes.length,
      data: savedSchemes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to delete a saved scheme for a user
export const deleteUserSavedScheme = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const { scheme_id } = req.body;
    await deleteSavedScheme(userId, scheme_id);

    res.json({
      message: "Saved scheme deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//controller to get all schemes

export const fetchAllSchemes = async (req, res) => {
  try {
    const schemes = await getAllSchemes();

    res.status(200).json({
      success: true,
      count: schemes.length,
      message: "Schemes retrieved successfully",
      data: schemes,
    });
  } catch (error) {
    success = false;
    console.error("Error fetching schemes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// function to get scheme by id

export const fetchSchemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await getSchemeById(id);

    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }

    res.status(200).json({
      success: true,
      message: "Scheme retrieved successfully",
      data: scheme,
    });
  } catch (error) {
    console.error("Error fetching scheme by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// explore controller to get schemes based on filters

export const getAllSchemesController = async (req, res) => {
  try {
    const filters = req.query;

    const schemes = await getFilteredSchemes(filters);

    res.json({
      success: true,
      data: schemes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
