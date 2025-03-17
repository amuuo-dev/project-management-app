import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../app/lib/db";
import { comparePassword, createJwt } from "../../app/lib/auth";
import { serialize } from "cookie";

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    const isUser = await comparePassword(req.body.password, user?.password);

    if (isUser) {
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
    }
  } else {
    res.status(402);
    res.json({});
  }
}
