import express from "express";
import { userControllers } from "./user.controller";
import { studentSchema } from "../student/studentValidation";
import { validateRequest } from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentSchema),
  userControllers.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  userControllers.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin
);

export const userRoutes = router;
