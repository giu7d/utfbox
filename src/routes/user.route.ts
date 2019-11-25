import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log("GET USERS");
});

router.get("/:id?", (req: Request, res: Response) => {
  console.log("GET USER BY ID");
});

router.post("/", (req: Request, res: Response) => {
  console.log("CREATE USER");
});

export default router;
