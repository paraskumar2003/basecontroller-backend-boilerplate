import express from "express";
import authRouter from "./auth";
import MiddleWares from "../middlewares";
import usersRouter from "./users";

const router = express.Router();
/**
  * @swagger
  * /:
  *   get:
  *     description: Returns the homepage
  *     responses:
  *       200:
  *         description: This is the most advance node server
  */

router.use("/auth", authRouter);
router.use("/users", MiddleWares.verifyUser, usersRouter);


export default router;