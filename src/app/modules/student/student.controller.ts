import { StudentServices } from "./student.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  
  const result = await StudentServices.getAllStudentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get all student successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get a student successfully",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudentFromDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update a student successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete a student successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
