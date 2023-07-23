import ValidationError from "../error/validation-error";
import { ValidateMidd } from "./validate.types";

const Validate: ValidateMidd = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ValidationError(error));
  }
};

export default Validate;
