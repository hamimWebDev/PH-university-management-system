import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { AcademicFaultyServices } from "./AcademicFaulty.service";

const createAcademicFaulty = catchAsync(async (req, res) => {
  const result = await AcademicFaultyServices.createAcademicFaultyIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create Academic faulty successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFaultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculties are retrieved successfully",
    data: result,
  });
});

const getSingleAcademicFaulty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFaultyServices.getSingleAcademicFaultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faulty is retrieved successfully",
    data: result,
  });
});

const updateAcademicFaulty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFaultyServices.updateAcademicFaultyIntoDB(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faulty is updated successfully",
    data: result,
  });
});

export const AcademicFaultyControllers = {
  createAcademicFaulty,
  getAllAcademicFaculties,
  getSingleAcademicFaulty,
  updateAcademicFaulty,
};
