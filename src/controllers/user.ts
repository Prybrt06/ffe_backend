import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../utils/auth";

export const createNewUser = async (req, res, next) => {
  try {
    const prevUser = await prisma.user.findFirst({
      where: { mail: req.body.mail },
    });

    if (prevUser) {
      res.status(409);
      return res.json({
        message: "Email already in use.",
      });
    }
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        mail: req.body.mail,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.status(201);
    res.json({ token });
  } catch (e) {
    console.log(e);
    e.type = "input";
    next(e);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      mail: req.body.mail,
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  var isPasswordValid = await comparePasswords(
    req.body.password,
    user.password
  );

  if (!isPasswordValid) {
    res.status(401);
    res.json({ message: "Invalid password" });
    return;
  }

  const token = createJWT(user);
  res.status(201);
  res.json({ message: "Signin successfully", token: token });
};

export const getUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await prisma.user.findUnique({
      where: {
        mail: email,
      },
      select: {
        id: true,
        username: true,
        mail: true,
        password: false,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch {
    res.status(400).json({ message: "Error occured" });
  }
};
