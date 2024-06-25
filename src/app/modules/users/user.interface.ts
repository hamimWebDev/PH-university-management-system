import { Model } from "mongoose";
import { USER_Role } from "./user.constant";

type UserRole = "admin" | "student" | "faculty";
type UserStatus = "in-progress" | "blocked";

export interface TUser {
  id: string;
  password: string;
  passwordChangeAt?: Date;
  needsPasswordChange: boolean;
  role: UserRole;
  status: UserStatus;
  isDeleted?: boolean;
}

export interface userModel extends Model<TUser> {
  isUserExistByCustomId(id: string): Promise<TUser>;
  isPasswordMashed(password: string, hashPassword: string): Promise<boolean>;
  isJwtIssuedAfterPasswordChanged(
    passwordChangeTime: Date,
    jwtIssuedTime: number
  ): boolean;
}

export type TUserRole = keyof typeof USER_Role;
