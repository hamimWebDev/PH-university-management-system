import { z } from "zod";

const createAcademicFaultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic faulty must be string",
    }),
  }),
});

const updateAcademicFaultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic faulty must be string",
      })
      .optional(),
  }),
});

export const academicFaultyValidation = {
  createAcademicFaultyValidationSchema,
  updateAcademicFaultyValidationSchema,
};
