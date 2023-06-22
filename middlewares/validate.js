import ValidationError from "../errors/validation-error.js";

const Validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(new ValidationError(error));
  }
};

export default Validate;
