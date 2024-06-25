import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";


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

  const refreshToken = jwt.sign(jwtPayload, config.jwt_secret2 as string, {
    expiresIn: "365d",
  });

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExist.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const user = await User?.isUserExistByCustomId(userData.userId);
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

  const isPasswordMashed = await User.isPasswordMashed(
    payload?.oldPassword,
    user?.password
  );

  if (isPasswordMashed === false) {
    throw new AppError(httpStatus.FORBIDDEN, "password do not match");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_routs)
  );
  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    }
  );
  return null;
};

const refreshToken = async (token: string) => {
  const decoded = jwt.verify(token, config.jwt_secret2 as string) as JwtPayload;

  // Example usage of 'role'
  const { userId, iat } = decoded;

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

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });
  return { accessToken };
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
};
