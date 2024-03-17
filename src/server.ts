import express from "express";
import morgan from "morgan";
import cors from "cors";

import { createNewUser, signin } from "./middleware/user";
import { body } from "express-validator";
import { inputHandler } from "./handlers/inputHandler";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "working fine" });
});

app.post(
  "/user/sign-up",
  body("username").isString(),
  body("mail").isString(),
  body("password").isString(),
  inputHandler,
  createNewUser
);

app.post(
  "/user/login",
  body("username").isString(),
  body("password").isString(),
  inputHandler,
  signin
);

app.use((err, req, res, next) => {
  if (err.type == "auth") {
    res.status(400).json({ message: "error in authentication" });
  } else if (err.type == "input") {
    res.status(400).json({
      message: "invalid input or username already used",
    });
  } else {
    res.status(400).json({ message: "There is an error" });
  }
});

export default app;
