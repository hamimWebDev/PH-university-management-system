// createAcademicFaultyIntoDB

import { TAcademicFaulty } from "./AcademicFaulty.interface";
import { AcademicFaulty } from "./AcademicFaulty.model";

const createAcademicFaultyIntoDB = async (payload: TAcademicFaulty) => {
  const result = await AcademicFaulty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaulty.find();
  return result;
};

const getSingleAcademicFaultyFromDB = async (id: string) => {
  const result = await AcademicFaulty.findById(id);
  return result;
};

const updateAcademicFaultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaulty>
) => {
  const result = await AcademicFaulty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFaultyServices = {
  createAcademicFaultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFaultyFromDB,
  updateAcademicFaultyIntoDB,
};
