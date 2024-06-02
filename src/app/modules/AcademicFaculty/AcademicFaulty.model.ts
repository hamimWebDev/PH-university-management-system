import { Schema, model } from "mongoose";
import { TAcademicFaulty } from "./AcademicFaulty.interface";

// Example usage
const academicFaultySchema = new Schema<TAcademicFaulty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicFaulty = model<TAcademicFaulty>(
  "AcademicFaulty",
  academicFaultySchema
);
