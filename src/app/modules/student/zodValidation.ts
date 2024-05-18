import * as z from "zod";

// Define schemas for sub-documents
const UserNameSchema = z.object({
  firstName: z.string().min(1).max(10),
  middleName: z.string().optional(),
  lastName: z.string().regex(/^[a-zA-Z]+$/),
});

const GuardianSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const LocalGuardianSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

// Define the main student schema
export const StudentSchemaZod = z.object({
  userId: z.string(),
  name: UserNameSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "blocked"]),
});

// Define a function to validate incoming data against the schema
export function validateStudent(data: any) {
  try {
    return StudentSchemaZod.parse(data);
  } catch (error) {
    throw new Error(`Validation failed: ${error.errors}`);
  }
}
