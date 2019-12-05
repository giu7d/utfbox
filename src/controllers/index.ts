import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Socket } from "socket.io";

const NO_TOKEN_PROVIDED = { auth: false, message: "No token provided." };
const FAILED_AUTH = { auth: false, message: "Failed to authenticate token." };

const controller = (promise: Function, params: Function) => async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const boundParams = params ? params(request, response, next) : [];

  try {
    const result = await promise(...boundParams);
    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({
      message: error.message
    });
  }
};

function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers["authorization"];

  if (!token) return response.status(401).send(NO_TOKEN_PROVIDED);

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) return response.status(500).send(FAILED_AUTH);

    next();
  });
}

function authenticateSocket(socket: Socket, next: Function) {
  const { token } = socket.request.headers;

  if (!token) {
    socket.error(NO_TOKEN_PROVIDED);
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any) => {
    if (err) {
      socket.error(FAILED_AUTH);
    } else {
      next();
    }
  });
}

export { controller, authenticate, authenticateSocket };
