import { RequestHandler } from "express";

export interface AuthMidd {
  (roles: string[]): RequestHandler;
}

declare global {
  namespace Express {
    export interface Request {
      jwt?: any;
    }
  }
}
