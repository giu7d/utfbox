import crypto from "crypto";

const hashPassword = (email: string, password: string) =>
  crypto
    .createHmac("sha256", password)
    .update(email, "utf8")
    .digest("hex");

const comparePassword = (
  email: string,
  password: string,
  savedHashedPassword: string
) => hashPassword(email, password) === savedHashedPassword;

const getInitials = (firstName: string, lastName: string) =>
  `${firstName[0]} ${lastName[0]}`.toUpperCase();

export { hashPassword, comparePassword, getInitials };
