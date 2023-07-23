import Joi from "joi";
import { RequestHandler } from "express";

export interface ValidateMidd {
  (schema: Joi.AnySchema): RequestHandler;
}
