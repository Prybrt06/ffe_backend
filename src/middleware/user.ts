import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res,next) => {
	try {
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
		e.type = "input";
		next(e);
	}
};

export const signin = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			username: req.body.username,
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
		res.json({ message: "invalid password" });
		return;
	}

	console.log("hhlfjkdhsjklahfkljhj");

	const token = createJWT(user);
	res.status(201);
	res.json({ message: "Signin successfully", token: token });
};
