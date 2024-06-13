import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/users/user.routes";
import { AcademicSemesterRoutes } from "../modules/AcademicSemester/AcademicSemester.routes";
import { AcademicFaultyRoutes } from "../modules/AcademicFaculty/AcademicFaulty.route";
import { AcademicDepartmentRoutes } from "../modules/AcademicDepartment/AcademicDepartment.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.route";

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
    path: "/faculties",
    route: FacultyRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
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
  {
    path: "/courses",
    route: CourseRoutes,
  },
  {
    path: "/semester-registrations",
    route: semesterRegistrationRoutes,
  },
  {
    path: "/offered-course",
    route: offeredCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
