import "dotenv/config";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

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

  if (!token)
    return response
      .status(401)
      .send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err)
      return response
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    next();
  });
}

export { controller, authenticate };
