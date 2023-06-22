import JsonWebToken from "jsonwebtoken";

export const generateToken = (payload) => {
  const token = JsonWebToken.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

export const generateRefreshToken = (payload) => {
  const refreshToken = JsonWebToken.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET
  );
  return refreshToken;
};
