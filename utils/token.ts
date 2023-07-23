import JsonWebToken from "jsonwebtoken";
import { TokenPayload } from "./token.types";

export const generateToken = (payload: TokenPayload) => {
  const token = JsonWebToken.sign(
    payload,
    process.env.TOKEN_SECRET as JsonWebToken.Secret,
    {
      expiresIn: "1 hours",
    }
  );

  return token;
};

export const generateRefreshToken = (payload: TokenPayload) => {
  const refreshToken = JsonWebToken.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET as JsonWebToken.Secret
  );

  return refreshToken;
};
