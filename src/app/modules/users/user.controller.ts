import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;

  const result = await userServices.createStudentIntoDB(password, studentData);

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
