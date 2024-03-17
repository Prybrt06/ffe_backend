import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/userRouter";
import taskRouter from "./routes/taskRoute";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "working fine" });
});

app.use("/user", userRouter);

app.use("/task", taskRouter);

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
