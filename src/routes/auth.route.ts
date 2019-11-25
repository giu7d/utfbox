import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.post("/", (req: Request, res: Response) => {
  console.log("AUTHENTICATE");
});

export default router;
