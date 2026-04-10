import { findUserById } from "../models/userModel.js";
import { getEligibleSchemes } from "../models/eligibilityModel.js";
import { checkEligibility } from "../utils/eligibilityChecker.js";
import { getAllSchemes } from "../models/schemeModel.js";

//controller to get manually eligible schemes for a user

export const checkUserEligibility = async (req, res) => {
  try {
    // const userData = req.query; // Assuming user data is sent in the request query parameters
    const userData = {
      age: Number(req.query.age),
      income: Number(req.query.income),
      occupation: req.query.occupation,
      category: req.query.category,
      state: req.query.state,
    };

    console.log("USER DATA:", userData);
    const schemes = await getAllSchemes();

    const eligibleSchemes = checkEligibility(schemes, userData);
    console.log("Filtered Schemes:", eligibleSchemes.length);
    res.status(200).json({
      success: true,
      message: "Eligibility check completed",
      count: eligibleSchemes.length,
      data: eligibleSchemes,
    });
  } catch (error) {
    console.error("Error checking eligibility:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to automatically check eligibility for a user based on their profile
export const autoEligibility = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT

    // 1. get user data
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 ADD THIS NORMALIZATION HERE
    const normalizedUser = {
      age: user.age || 0,
      income: user.income || 0,
      occupation: user.occupation?.trim().toLowerCase() || "",
      category: user.category?.trim().toLowerCase() || "general",
      state: user.state?.trim().toLowerCase() || "central",
      gender: user.gender?.trim().toLowerCase() || "all",
    };

    // 👇 PASS THIS INSTEAD OF RAW USER
    const schemes = await getEligibleSchemes(normalizedUser);

    console.log("USER:", user);
    console.log("NORMALIZED:", normalizedUser);

    res.status(200).json({
      success: true,
      count: schemes.length,
      data: schemes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Eligibility check failed" });
  }
};
