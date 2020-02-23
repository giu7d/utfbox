import express, { Router, Request, Response, NextFunction } from "express";
import { controller, authenticate } from "../controllers";
import {
  getAllUsers,
  getUserById,
  createUser
} from "../controllers/user.controller";

const router: Router = express.Router();

router.get(
  "/",
  authenticate,
  controller(
    getAllUsers,
    (request: Request, response: Response, next: NextFunction) => []
  )
);

router.get(
  "/:id?",
  authenticate,
  controller(
    getUserById,
    (request: Request, response: Response, next: NextFunction) => [
      request.params.id
    ]
  )
);

router.post(
  "/",
  controller(
    createUser,
    (request: Request, response: Response, next: NextFunction) => [request.body]
  )
);

export default router;
