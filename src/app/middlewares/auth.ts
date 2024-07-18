import httpStatus from "http-status";
import { AppError } from "../errors/AppErrors";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { Request, Response, NextFunction } from "express";
import { TUserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.model";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "please send a authorization token"
      );
    }

    let decoded;

    try {
      decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;
      req.user = decoded;
    } catch {
      throw new AppError(httpStatus.UNAUTHORIZED, "Expired token");
    }

    // Example usage of 'role'
    const { role, userId, iat } = decoded;

    const user = await User?.isUserExistByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "user is fot found");
    }

    const isDeleted = user?.isDeleted;
    if (isDeleted === true) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is already deleted");
    }

    const isStatus = user?.status;
    if (isStatus === "blocked") {
      throw new AppError(httpStatus.NOT_FOUND, "This user is already blocked");
    }

    if (
      user.passwordChangeAt &&
      User.isJwtIssuedAfterPasswordChanged(user.passwordChangeAt, iat as number)
    ) {
      throw new AppError(httpStatus.NOT_FOUND, "You are not authorized!");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    } else {
      next();
    }
  });
};
