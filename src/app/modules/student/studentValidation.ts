import { z } from "zod";

// Define Zod schemas for nested objects first
const userNameSchema = z.object({
  firstName: z
    .string()
    .max(10, "First name must be at most 10 characters long")
    .nonempty("First name is required")
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .regex(/^[A-Za-z]+$/, "Last name must contain only alphabetic characters")
    .trim(),
});

const guardianSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required").trim(),
  fatherOccupation: z
    .string()
    .nonempty("Father's occupation is required")
    .trim(),
  fatherContactNo: z
    .string()
    .nonempty("Father's contact number is required")
    .trim(),
  motherName: z.string().nonempty("Mother's name is required").trim(),
  motherOccupation: z
    .string()
    .nonempty("Mother's occupation is required")
    .trim(),
  motherContactNo: z
    .string()
    .nonempty("Mother's contact number is required")
    .trim(),
});

const localGuardianSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required").trim(),
  occupation: z
    .string()
    .nonempty("Local guardian's occupation is required")
    .trim(),
  contactNo: z
    .string()
    .nonempty("Local guardian's contact number is required")
    .trim(),
  address: z.string().nonempty("Local guardian's address is required").trim(),
});

// Define the main student schema
export const studentSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameSchema,
      gender: z.enum(["male", "female", "other"], {
        errorMap: () => ({
          message: "Gender must be either male, female, or other",
        }),
      }),
      dateOfBirth: z.string().trim().optional(),
      email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email format")
        .trim(),
      contactNo: z.string().nonempty("Contact number is required").trim(),
      emergencyContactNo: z
        .string()
        .nonempty("Emergency contact number is required")
        .trim(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        errorMap: () => ({ message: "Invalid blood group" }),
      }),
      presentAddress: z.string().nonempty("Present address is required").trim(),
      permanentAddress: z
        .string()
        .nonempty("Permanent address is required")
        .trim(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImg: z.string().trim().optional(),
    }),
  }),
});
