import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  //const result = await Student.findOne({ userId: id });
  const result = await Student.aggregate([{ $match: { userId: id } }]);

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ userId: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
