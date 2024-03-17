import { Router } from "express";
import { protect } from "../utils/auth";
import * as Task from "../controllers/task";

const taskRouter = Router();

taskRouter.get("/", protect, Task.getAllTask);

taskRouter.post("/add", protect, Task.createTask);

taskRouter.get("/:id", protect, Task.getTask);

export default taskRouter;
