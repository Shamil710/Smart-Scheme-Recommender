import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
      });
    }

    // Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extra validation
    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    req.user = decoded;

    next();

  } catch (error) {
    console.error("Auth Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};