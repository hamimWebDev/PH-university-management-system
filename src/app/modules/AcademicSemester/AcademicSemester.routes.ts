import express from "express";
import { AcademicSemesterControllers } from "./AcademicSemester.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AcademicSemesterValidations } from "./AcademicSemester.validation";

const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(AcademicSemesterValidations.createAcademicSemesterSchema),
  AcademicSemesterControllers.createAcademicSemester
);

router.get(
  "/:semesterId",
  AcademicSemesterControllers.getSingleAcademicSemester
);

router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
);

router.get("/", AcademicSemesterControllers.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;
