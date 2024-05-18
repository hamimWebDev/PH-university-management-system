import Joi from "joi";

// UserName Schema
const userNameSchema = Joi.object({
  firstName: Joi.string().max(10).required().trim(),
  middleName: Joi.string().trim().allow(null, ""),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(new RegExp("^[a-zA-Z]+$"))
    .messages({
      "string.pattern.base": "{#label} must only contain alphabets",
    }),
});

// Guardian Schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required().trim(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required().trim(),
  motherContactNo: Joi.string().required().trim(),
});

// LocalGuardian Schema
const localGuardianSchema = Joi.object({
  name: Joi.string().required().trim(),
  occupation: Joi.string().required().trim(),
  contactNo: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
});

// Student Schema
export const studentSchemaJoi = Joi.object({
  userId: Joi.string().required().trim(),
  name: userNameSchema.required(),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": "{#label} must be one of [male, female, other]",
  }),
  dateOfBirth: Joi.string().trim(),
  email: Joi.string().email().required().trim(),
  contactNo: Joi.string().required().trim(),
  emergencyContactNo: Joi.string().required().trim(),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .trim()
    .messages({
      "any.only": "{#label} must be a valid blood group",
    }),
  presentAddress: Joi.string().required().trim(),
  permanentAddress: Joi.string().required().trim(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().trim().allow(null, ""),
  isActive: Joi.string().valid("active", "blocked").required().trim().messages({
    "any.only": "{#label} must be one of [active, blocked]",
  }),
});
