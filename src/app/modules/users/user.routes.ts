import express from "express";
import { userControllers } from "./user.controller";
import { studentSchema } from "../student/studentValidation";
import { validateRequest } from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { auth } from "../../middlewares/auth";
import { USER_Role } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_Role.admin),
  validateRequest(studentSchema),
  userControllers.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(createFacultyValidationSchema),
  auth(USER_Role.admin, USER_Role.faculty),
  userControllers.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userControllers.createAdmin
);

export const userRoutes = router;
