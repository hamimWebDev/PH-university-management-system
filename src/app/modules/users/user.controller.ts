import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { UserServices } from "./user.service";
import { AppError } from "../../errors/AppErrors";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create student as a user successfully",
    data: result,
  });
});

export const userControllers = {
  createStudent,
};
