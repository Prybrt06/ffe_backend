import prisma from "../db";

export const createTask = async (req, res) => {
  try {
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

export const getTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await prisma.task.findUnique({
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
