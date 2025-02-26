import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CreateUserDTO, LoginDTO } from "./user.dto";

const prisma = new PrismaClient();

export class UserService {
  /**
   * Registers a new user by hashing the password and storing the user's information in the database.
   *
   * @param {CreateUserDTO} data - The data required to create a new user, including email, password, and name.
   * @returns {Promise<Object>} - Returns an object containing the user information, access token, and refresh token.
   * @throws {Error} - Throws an error if the email already exists or if there is an issue with the registration process.
   */
  public async register(data: CreateUserDTO) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "15m" } // Short-lived access token
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
      { expiresIn: "7d" } // Long-lived refresh token
    );

    return { user, accessToken, refreshToken };
  }

  /**
   * Authenticates a user by verifying their credentials and generating access and refresh tokens.
   *
   * @param {LoginDTO} data - The login data including email and password.
   * @returns {Promise<Object>} - Returns an object containing user information, access token, and refresh token.
   * @throws {Error} - Throws an error if the credentials are invalid or if there's an issue with login.
   */
  public async login(data: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "15m" } // Short-lived access token
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET || "refresh_secret",
      { expiresIn: "7d" } // Long-lived refresh token
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Retrieves the profile of a user based on their user ID.
   *
   * @param {string} userId - The unique identifier of the user.
   * @returns {Promise<Object>} - Returns the user information including id, email, and name.
   * @throws {Error} - Throws an error if the user is not found.
   */
  public async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
