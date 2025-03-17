import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/app/lib/db";
import { createJwt, hashedPassword } from "@/app/lib/auth";
import { serialize } from "cookie";
export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if email already exists
  const existingUser = await db.user.findUnique({
    where: { email: req.body.email },
  });

  if (existingUser) {
    return res.status(400).json({ error: "Email already in use" });
  }

  if (req.method === "POST") {
    const user = await db.user.create({
      data: {
        email: req.body.email,
        password: await hashedPassword(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });

    const jwt = await createJwt(user);
    const cookieName = process.env.COOKIE_NAME;
    res.setHeader(
      "Set-Cookie",
      serialize(cookieName, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );
    res.status(201);
    res.json({});
  } else {
    res.status(402);
    res.json({});
  }
}
