import { TAcademicSemester } from "./AcademicSemester.interface";
import AcademicSemester from "./AcademicSemester.model";
import { AcademicSemesterNameCodeMapper } from "./academicSemester.constant";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // Semester name --> Semester code
  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester code");
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB
};
