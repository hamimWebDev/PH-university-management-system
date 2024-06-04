import express from "express";
import { StudentControllers } from "./student.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { updateStudentSchema } from "./studentValidation";

const router = express.Router();
router.get("/", StudentControllers.getAllStudents);
router.get("/:studentId", StudentControllers.getSingleStudent);
router.patch(
  "/:studentId",
  validateRequest(updateStudentSchema),
  StudentControllers.updateStudent
);
router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;
