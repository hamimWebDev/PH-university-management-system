import { z } from "zod";

const academicFaultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Academic faulty must be string",
  }),
});

export const academicFaultyValidation = {
  academicFaultyValidationSchema,
};
