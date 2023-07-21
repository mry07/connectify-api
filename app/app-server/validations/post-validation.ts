import Joi from "joi";

export const comment = Joi.object({
  post_id: Joi.any(),
  comment: Joi.string().trim().required().messages({
    "any.required": "Komentar dibutuhkan",
    "string.empty": "Komentar tidak boleh kosong",
  }),
});
