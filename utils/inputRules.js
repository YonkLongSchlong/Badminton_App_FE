import { emailRegex, passwordRegex, usernameRegex } from "../constant/Regex.js";

export const usernameRules = {
  required: "Please enter your user name",
  maxLength: {
    value: 24,
    message: "Username can't be longer than 24 characters",
  },
  pattern: {
    value: usernameRegex,
    message: "Username can't not contain special characters",
  },
};

export const emailRules = {
  required: "Please enter your email",
  pattern: {
    value: emailRegex,
    message: "Invalid email",
  },
};

export const passwordRules = {
  required: "Please enter your password",
  maxLength: {
    value: 24,
    message: "Password can't be longer than 24 characters",
  },
  pattern: {
    value: passwordRegex,
    message:
      "Password must contain at least 8 characters, an uppercase, a number and special characters",
  },
};

export const otpRules = {
  required: "Please enter your OTP",
  pattern: {
    value: /^[0-9]{6}$/,
    message: "Invalid OTP",
  },
};
