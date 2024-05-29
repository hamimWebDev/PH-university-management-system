import { Router } from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { userRoutes } from "../modules/users/user.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
