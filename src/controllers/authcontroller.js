import Users from "../db/users.js";
import { AppError } from "../middlewares/globalErrorHandler.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt-tokens.js";
const userInstance = new Users();

const registerNewUser = (req, res) => {
  const newUserData = req.body;
  const savedNewUser = userInstance.createNewUser(newUserData);
  if (!req.body.username) {
    throw new AppError("User name is required", 400);
  }

  res.status(200).json({
    success: true,
    data: savedNewUser,
    message: "User registered successfully",
  });
};

const logInUser = (req, res) => {
  const userToLogin = req.body;
  //get the existing user through the email while loggig in
  const existingUser = userInstance.findUserByEmail(userToLogin.email);

  //accessToken and refreshToken are used to save the user confidentiial data into a gibbiresh token string for authentication and authorization
  const accessToken = generateAccessToken(existingUser.id);
  const refreshToken = generateRefreshToken(existingUser.id);

  res.status(200).json({
    success: true,
    data: {
      loggedinUser: existingUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    },

    message: "User logged in successfully",
  });
};

const refreshAccessToken = (req, res) => {
  // TODO: Implement refresh token verification and new token generation here
  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
  });
};

export { registerNewUser, logInUser, refreshAccessToken };
