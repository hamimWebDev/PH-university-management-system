import { TAcademicSemester } from "../AcademicSemester/AcademicSemester.interface";
import { User } from "./user.model";

export const findLastStudentFunction = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generatedStudentId = async (payload: TAcademicSemester) => {
  const currentId = (await findLastStudentFunction()) || (0).toString();
  let inCurrentId = (Number(currentId) + 1).toString().padStart(4, "0");
  inCurrentId = `${payload.year}${payload.code}${inCurrentId}`;
  return inCurrentId;
};
