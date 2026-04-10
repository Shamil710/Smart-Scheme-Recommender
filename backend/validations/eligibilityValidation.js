export const validateEligibility = (req, res, next) => {
  const { age, income, beneficiary_category } = req.body;

  if (age !== undefined && (age < 0 || age > 120)) {
    return res.status(400).json({ message: "Invalid age" });
  }

  if (income !== undefined && income < 0) {
    return res.status(400).json({ message: "Invalid income" });
  }

  const validCategories = ["General", "OBC", "SC", "ST"];

  if (beneficiary_category && !validCategories.includes(beneficiary_category)) {
    return res.status(400).json({ message: "Invalid beneficiary category" });
  }

  next();
};
