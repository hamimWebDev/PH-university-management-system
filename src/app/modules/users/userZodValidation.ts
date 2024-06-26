import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .min(7, {
      message: "Password must be more than 7 characters",
    })
    .max(20, {
      message: "Password must be longer than 20 characters",
    })
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
