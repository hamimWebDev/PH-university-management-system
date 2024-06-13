import { Model } from "mongoose";

type UserRole = "admin" | "student" | "faculty";
type UserStatus = "in-progress" | "blocked";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: UserRole;
  status: UserStatus;
  isDeleted?: boolean;
}

export interface userModel extends Model<TUser> {
  isExistByCustomId(id: string): Promise<TUser>;
}
