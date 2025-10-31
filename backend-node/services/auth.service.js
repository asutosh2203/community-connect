import bcrypt from "bcryptjs";
import { prisma } from "../src/db.js";
import jwt from "jsonwebtoken";

export const registerUser = async (user) => {
  // generate salt
  const salt = await bcrypt.genSalt(10);

  // hash password
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      passwordHash: hashedPassword,
      phoneNumber: user.phoneNumber,
      name: user.name,
    },
    // We select what to return for security
    select: {
      id: true,
      email: true,
      name: true,
      phoneNumber: true,
      //   role: true,
      //   createdAt: true,
    },
  });

  return newUser;
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throw new Error("Invalid Email or Password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password.");
  }

  const { passwordHash, ...userWithoutHash } = user;
  return userWithoutHash;
};

export const validateUserFromToken = async (token) => {
  try {
    // 1. Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload || !payload.userId) {
      throw new Error("Invalid token");
    }

    // 2. Find the user from the token's ID
    const user = await prisma.user.findFirst({
      where: { id: payload.userId },
      // 3. Select only the safe data to return
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  } catch (error) {
    // This will catch expired tokens, invalid signatures, etc.
    console.error("Token validation error:", error.message);
    return null; // Return null if anything goes wrong
  }
};
