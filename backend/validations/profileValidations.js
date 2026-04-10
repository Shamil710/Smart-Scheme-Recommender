export const validateProfileUpdate = (req, res, next) => {
  const { age, income, category, occupation, state } = req.body;

  // Age validation
  if (age !== undefined) {
    if (typeof age !== "number" || age <= 0) {
      return res.status(400).json({
        success: false,
        message: "Age must be a positive number",
      });
    }
  }

  // Income validation
  if (income !== undefined) {
    if (typeof income !== "number" || income < 0) {
      return res.status(400).json({
        success: false,
        message: "Income must be a valid number",
      });
    }
  }

  // Category validation
  const validCategories = ["General", "OBC", "SC", "ST"];
  if (category && !validCategories.includes(category)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category",
    });
  }

  // Occupation validation
  if (occupation && occupation.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Occupation must be at least 2 characters",
    });
  }

  // State validation
  if (state && state.length < 2) {
    return res.status(400).json({
      success: false,
      message: "State must be valid",
    });
  }

  next();
};
