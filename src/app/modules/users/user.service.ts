import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (Password: string, StudentD: TStudent) => {
  // create a student object
  const userData: Partial<TUser> = {};

  //   if password is not given use default password

  userData.password = Password || (config.default_password as string);

  // set student roll
  userData.role = "student";

  // generated id
  userData.id = "203010001";

  // create user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    StudentD.userId = newUser.id;
    StudentD.user = newUser._id;

    const newStudent = await Student.create(StudentD);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
