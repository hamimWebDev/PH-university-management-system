import express from "express";
import { userControllers } from "./user.controller";
import { studentSchema } from "../student/studentValidation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(studentSchema),
  userControllers.createStudent
);


export const userRoutes = router;
