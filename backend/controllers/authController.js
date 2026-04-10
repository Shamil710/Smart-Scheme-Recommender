import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { updateUserProfile } from "../models/userModel.js";

// Registration logic
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age, income, occupation, category, state } =
      req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      age,
      income,
      occupation,
      category,
      state,
    });

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIC FOR JWT TOKEN GENERATION

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // payload
      process.env.JWT_SECRET, // secret
      { expiresIn: "1h" }, // expiry
    );

    // 4️⃣ Remove password
    const { password: _, ...userWithoutPassword } = user;

    // 5️⃣ Send response
    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// logic for current profile
export const currentProfile = async (req, res) => {
  try {
    const user = req.user;
    const result = await findUserById(user.id);

    const { password: _, ...userWithoutPassword } = result;
    res.json({ message: "Current user profile", user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// logic for logout user
export const logoutUser = async (req, res) => {
  try {
    // Optional: check if user exists in request (token valid)
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }

    // No server-side session → just respond
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during logout",
    });
  }
};

// logic for update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { age, income, occupation, category, state } = req.body;

    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await updateUserProfile(userId, {
      age: age !== undefined ? age : user.age,
      income: income !== undefined ? income : user.income,
      occupation: occupation !== undefined ? occupation : user.occupation,
      category: category !== undefined ? category : user.category,
      state: state !== undefined ? state : user.state,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    res.json({
      message: "Profile updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
