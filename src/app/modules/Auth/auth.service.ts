import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import config from "../../config";

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await User?.isUserExistByCustomId(payload?.id);
  if (await !User.isUserExistByCustomId(payload?.id)) {
    throw new AppError(httpStatus.NOT_FOUND, "user is fot found");
  }

  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is already deleted");
  }

  const isStatus = isUserExist?.status;
  if (isStatus === "blocked") {
    throw new AppError(httpStatus.NOT_FOUND, "This user is already blocked");
  }

  const isPasswordMashed = await User.isPasswordMashed(
    payload.password,
    isUserExist.password
  );

  if (isPasswordMashed === false) {
    throw new AppError(httpStatus.FORBIDDEN, "password do not match");
  }

  const jwtPayload = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    needsPasswordChange: isUserExist.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
