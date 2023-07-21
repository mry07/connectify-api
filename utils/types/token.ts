export interface TokenPayload {
  // user id
  sub: string;

  username: string;
  email: string;
  role: string;

  // App-Id
  iss: string;
}
