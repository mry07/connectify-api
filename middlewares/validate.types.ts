import Joi from "joi";
import { RequestHandler } from "express";

export interface ValidateMw {
  (schema: Joi.AnySchema): RequestHandler;
}
