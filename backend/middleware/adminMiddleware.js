export const isAdmin = (req, res, next) => {
  console.log("ADMIN MIDDLEWARE HIT");   // 👈 MOVE INSIDE

  if (!req.user) {
    console.log("NO USER FOUND");
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("USER ROLE:", req.user.role);

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};