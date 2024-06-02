import express from "express";

import { validateRequest } from "../../middlewares/validateRequest";
import { academicFaultyValidation } from "./AcademicFaulty.validation";
import { AcademicFaultyControllers } from "./AcademicFaulty.controller";

const router = express.Router();

router.post(
  "/create-academic-faculty",
  validateRequest(
    academicFaultyValidation.createAcademicFaultyValidationSchema
  ),
  AcademicFaultyControllers.createAcademicFaulty
);

router.get("/", AcademicFaultyControllers.getAllAcademicFaculties);

router.get("/:facultyId", AcademicFaultyControllers.getSingleAcademicFaulty);

router.patch(
  "/:facultyId",
  validateRequest(
    academicFaultyValidation.updateAcademicFaultyValidationSchema
  ),
  AcademicFaultyControllers.updateAcademicFaulty
);

export const AcademicFaultyRoutes = router;
