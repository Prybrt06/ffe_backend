import { Router } from "express";
import { protect } from "../utils/auth";
import * as Task from "../controllers/task";

const taskRouter = Router();

taskRouter.get("/", protect, Task.getAllTask);

taskRouter.post("/", protect, Task.createTask);

taskRouter.delete("/:id", protect, Task.deleteTask);

export default taskRouter;
