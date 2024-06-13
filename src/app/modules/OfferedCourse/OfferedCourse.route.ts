import express from "express";

import { OfferedCourseControllers } from "./OfferedCourse.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { OfferedCourseValidations } from "./OfferedCourse.validation";

const router = express.Router();

router.post(
  "/create-offered-course",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);

router.patch(
  "/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse
);

export const offeredCourseRoutes = router;
