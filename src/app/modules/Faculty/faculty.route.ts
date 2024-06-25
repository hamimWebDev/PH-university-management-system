import express from "express";
import { updateFacultyValidationSchema } from "./faculty.validation";
import { FacultyControllers } from "./faculty.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { USER_Role } from "../users/user.constant";

const router = express.Router();

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:id",
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete("/:id", FacultyControllers.deleteFaculty);

router.get(
  "/",
  auth(USER_Role.admin, USER_Role.faculty),
  FacultyControllers.getAllFaculties
);

export const FacultyRoutes = router;
