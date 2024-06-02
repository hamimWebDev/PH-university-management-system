import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/users/user.routes";
import { AcademicSemesterRoutes } from "../modules/AcademicSemester/AcademicSemester.routes";
import { AcademicFaultyRoutes } from "../modules/AcademicFaculty/AcademicFaulty.route";
import { AcademicDepartmentRoutes } from "../modules/AcademicDepartment/AcademicDepartment.route";

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
  {
    path: "/academic-faculties",
    route: AcademicFaultyRoutes,
  },
  {
    path: "/academic-departments",
    route: AcademicDepartmentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
