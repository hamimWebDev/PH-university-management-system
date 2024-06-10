import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import AcademicSemester from "../AcademicSemester/AcademicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../Builder/queryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const isThereAnyUpcomingOrOngoingSemesterRegistration =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSemesterRegistration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already an ${isThereAnyUpcomingOrOngoingSemesterRegistration.status} semesterRegistration`
    );
  }

  const academicSemester = payload?.academicSemester;

  const isAcademicSemesterExist =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This AcademicSemester not found");
  }

  const isAcademicRegistrationAlreadyExist = await SemesterRegistration.findOne(
    {
      academicSemester,
    }
  );
  if (isAcademicRegistrationAlreadyExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This AcademicSemester is Already exists"
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);

  return result;
};

const updateSingleSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const isAcademicRegistrationAlreadyExist =
    await SemesterRegistration.findById(id);
  if (!isAcademicRegistrationAlreadyExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This SemesterRegistration is not exists"
    );
  }

  const CurrentRequestSemesterRegistrationStatus =
    await isAcademicRegistrationAlreadyExist.status;

  if (CurrentRequestSemesterRegistrationStatus === "ENDED") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This is already ${CurrentRequestSemesterRegistrationStatus}`
    );
  }

  const requestStasesRegistrationStatus = payload?.status;
  if (
    CurrentRequestSemesterRegistrationStatus === "UPCOMING" &&
    requestStasesRegistrationStatus === "ENDED"
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${CurrentRequestSemesterRegistrationStatus} to ${requestStasesRegistrationStatus}`
    );
  }

  if (
    CurrentRequestSemesterRegistrationStatus === "ONGOING" &&
    requestStasesRegistrationStatus === "UPCOMING"
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly change status from ${CurrentRequestSemesterRegistrationStatus} to ${requestStasesRegistrationStatus}`
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSingleSemesterRegistration,
};
