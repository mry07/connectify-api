import Joi from "joi";

export const login = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email dibutuhkan",
    "string.empty": "Email tidak boleh kosong",
    "string.email": "Email tidak valid",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password dibutuhkan",
    "string.empty": "Password tidak boleh kosong",
  }),
});

export const register = Joi.object({
  name: Joi.string()
    .trim()
    .max(32)
    .required()
    .pattern(/\s{2,}|\d/, { invert: true })
    .messages({
      "any.required": "Nama dibutuhkan",
      "string.max": "Maksimal karakter adalah 32 karakter",
      "string.empty": "Nama tidak boleh kosong",
      "string.pattern.invert.base":
        "Nama hanya boleh mengandung huruf dan tidak boleh mengandung spasi berulang",
    }),
  username: Joi.string()
    .trim()
    .max(32)
    .pattern(/[^\w+]/, { invert: true })
    .required()
    .messages({
      "any.required": "Username dibutuhkan",
      "string.max": "Maksimal karakter adalah 32 karakter",
      "string.empty": "Username tidak boleh kosong",
      "string.pattern.invert.base":
        "Hanya diperbolehkan huruf, angka atau underscore(_)",
    }),
  email: Joi.string().trim().email().max(64).required().messages({
    "any.required": "Email dibutuhkan",
    "string.max": "Maksimal karakter adalah 64 karakter",
    "string.empty": "Email tidak boleh kosong",
    "string.email": "Email tidak valid",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password dibutuhkan",
    "string.empty": "Password tidak boleh kosong",
  }),
});
