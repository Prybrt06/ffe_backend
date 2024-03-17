import prisma from "../db";

export const createTask = async (req, res) => {
  try {
    if (!req.body.title) {
      res.status(400).json({ message: "Task name is required" });
    }
    if (!req.body.description) {
      res.status(400).json({ message: "Description is required" });
    }

    const task = await prisma.task.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    res.status(201);
    res.json({ task });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getAllTask = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200);
    res.json({ tasks });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    let task = await prisma.task.findFirst({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    res.status(200);
    res.json({ task });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
