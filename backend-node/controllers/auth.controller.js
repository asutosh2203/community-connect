import {
  loginUser,
  registerUser,
  validateUserFromToken,
} from "../services/auth.service.js";
import { Prisma } from "@prisma/client";
import jwt from "jsonwebtoken";

// /api/auth/register
export const register = async (req, res) => {
  try {
    const { email, password, name, phoneNumber } = req.body;

    // Proper Validation
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Email, password, and name are required." });
    }
    if (password.length < 10) {
      return res
        .status(400)
        .json({ error: "Password must be at least 10 characters long." });
    }

    const newUser = await registerUser({
      email,
      password,
      name,
      phoneNumber: phoneNumber || "",
    });

    return res.status(201).json(newUser);
  } catch (error) {
    // Catch Specific Errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 is the error code for "Unique constraint failed"
      if (error.code === "P2002") {
        // We can even check which field failed
        const field = (error.meta?.target)[0];
        return res
          .status(409)
          .json({ error: `A user with this ${field} already exists.` });
      }
    }

    // Generic fallback error
    console.log("SERVER ERROR: ", error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again" });
  }
};

// /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Invalid email or password" });

    const user = await loginUser(email, password);

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set the Secure Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day (matches token)
      path: "/",
    });

    // Send the user data back to the frontend
    return res.status(200).json(user);
  } catch (error) {
    // Check for the specific "Invalid credentials" error
    if (error instanceof Error && error.message.includes("Invalid")) {
      return res.status(401).json({ error: error.message });
    }

    // Generic fallback error
    console.log("SERVER ERROR: ", error.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // must match
    });
    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully!" });
  } catch (error) {
    console.log("SERVER ERROR: ", error.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

// /api/auth/getme
export const getMe = async (req, res) => {
  try {
    // 1. Get the token from the cookie
    const token = req.cookies.token;

    if (!token) {
      console.log("NO TOKEN");
      return res.status(401).json({ user: null, error: "Not authenticated" });
    }

    // 2. Call the service to validate the token and get the user
    const user = await validateUserFromToken(token);

    if (!user) {
      // Token was invalid or user not found
      return res.status(401).json({ user: null, error: "Invalid token" });
    }

    // 3. Success! Return the user data.
    return res.status(200).json({ user });
  } catch (error) {
    console.log("SERVER ERROR: ", error.message);
    return res.status(500).json({ user: null, error: "Something went wrong." });
  }
};
