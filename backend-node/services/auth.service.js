import bcrypt from "bcryptjs";
import { prisma } from "../src/db.js";

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
