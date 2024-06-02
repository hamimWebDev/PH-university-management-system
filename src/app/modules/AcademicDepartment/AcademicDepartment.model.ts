import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./AcademicDepartment.interface";

// Example usage
const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
