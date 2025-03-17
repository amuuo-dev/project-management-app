import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import { db } from "./db";
import { cookies } from "next/headers";

export const hashedPassword = (password) => bcrypt.hash(password, 10);

export const comparePassword = (plainPassword, hashedPassword) =>
  bcrypt.compare(plainPassword, hashedPassword);

const alg = "HS256";
const secret = process.env.JWT_SECRET;

export const createJwt = (user) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({
    payload: { id: user.id, email: user.email },
  })
    .setProtectedHeader({ alg })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(secret));
};
export const validateJwt = async (jwt) => {
  const { payload } = await jwtVerify(jwt, new TextEncoder().encode(secret));
  //first payload is the one above and the .payload is from return from signjwt
  return payload.payload;
};

const cookie_secret = process.env.COOKIE_NAME;
//getting the cookie

export const getUserFromJwt = async () => {
  // const jwt = cookies.get(cookie_secret);
  const cookieStore = await cookies();
  const jwt = cookieStore.get(cookie_secret)?.value;
  if (!jwt) {
    console.error("No JWT found in cookies");
    return null;
  }
  const { id } = await validateJwt(jwt);
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};
