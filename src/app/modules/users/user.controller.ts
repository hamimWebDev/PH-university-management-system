import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await userServices.createStudentIntoDB(
      password,
      studentData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Create student as a user successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userControllers = {
  createStudent,
};
