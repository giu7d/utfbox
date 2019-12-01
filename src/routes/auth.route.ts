import express, { Router, Request, Response, NextFunction } from "express";
import { authenticateUser } from "../controllers/auth.controller";
import { controller } from "../controllers";

const router: Router = express.Router();

router.post(
  "/",
  controller(
    authenticateUser,
    (request: Request, response: Response, next: NextFunction) => [
      request.body.username,
      request.body.password
    ]
  )
);

export default router;
