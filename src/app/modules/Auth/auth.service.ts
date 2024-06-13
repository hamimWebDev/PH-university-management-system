import httpStatus from "http-status";
import { AppError } from "../../errors/AppErrors";
import { User } from "../users/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await User.findOne({ id: payload.id });
  console.log(isUserExist);
  if (!isUserExist) {
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

  const isPasswordMashed = await bcrypt.compare(
    payload?.password,
    isUserExist?.password
  );

  console.log(isPasswordMashed);

  return {};
};

export const AuthServices = {
  loginUser,
};
