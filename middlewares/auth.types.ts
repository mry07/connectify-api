import { RequestHandler } from "express";

export interface AuthMw {
  (roles: string[]): RequestHandler;
}

declare global {
  namespace Express {
    export interface Request {
      jwt?: any;
    }
  }
}
