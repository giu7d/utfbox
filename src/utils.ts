import crypto from "crypto";

const hashPassword = (username: string, password: string) =>
  crypto
    .createHmac("sha256", password)
    .update(username, "utf8")
    .digest("hex");

const comparePassword = (
  username: string,
  password: string,
  savedHashedPassword: string
) => hashPassword(username, password) === savedHashedPassword;

const getInitials = (firstName: string, lastName: string) =>
  `${firstName[0]} ${lastName[0]}`.toUpperCase();

export { hashPassword, comparePassword, getInitials };
