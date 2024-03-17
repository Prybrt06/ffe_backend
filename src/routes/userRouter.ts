import { Router } from "express";
import { body } from "express-validator";
import { inputHandler } from "../handlers/inputHandler";
import * as user from "../controllers/user";

const userRouter = Router();

userRouter.get(
  "/login",
  body("username").isString(),
  body("password").isString(),
  inputHandler,
  user.signin,
);

userRouter.post(
  "/sign-up",
  body("username").isString(),
  body("mail").isString(),
  body("password").isString(),
  inputHandler,
  user.createNewUser,
);

userRouter.get("/:email", user.getUser);

export default userRouter;
