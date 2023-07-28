import ValidationError from "../error/validation-error.js";
import { ValidateMw } from "./validate.types.js";

const Validate: ValidateMw = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ValidationError(error));
  }
};

export default Validate;
