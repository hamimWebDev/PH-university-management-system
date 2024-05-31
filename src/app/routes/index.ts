import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/users/user.routes";
import { AcademicSemesterRoutes } from "../modules/AcademicSemester/AcademicSemester.routes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/students",
    route: StudentRoutes,
  },
  {
    path: "/academic-semesters",
    route: AcademicSemesterRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
