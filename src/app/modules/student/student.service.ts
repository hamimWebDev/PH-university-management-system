import { Student } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (StudentD: TStudent) => {
  if (await Student.isUserExist(StudentD.userId)) {
    throw Error("This user already exist");
  }
  const result = await Student.create(StudentD);

  //  custom instance method
  // const student = new Student(StudentD);

  // if (await student.isUserExits(StudentD.userId)) {
  //   throw Error("This user already exist ");
  // }
  // const result = await student.save();

  return result;
};

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
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
