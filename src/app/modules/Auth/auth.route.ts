import express from "express";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
import { validateRequest } from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/login",
  AuthControllers.loginUser
);

export const AuthRoutes = router;
