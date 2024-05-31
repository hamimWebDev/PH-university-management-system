import config from "../../config";
import AcademicSemester from "../AcademicSemester/AcademicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";

const createStudentIntoDB = async (Password: string, payload: TStudent) => {
  // create a student object
  const userData: Partial<TUser> = {};

  //   if password is not given use default password

  userData.password = Password || (config.default_password as string);

  // find admissionSemester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  // set student roll
  userData.role = "student";

  // generated id
  userData.id = await generatedStudentId(admissionSemester);

  // create user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    payload.userId = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
