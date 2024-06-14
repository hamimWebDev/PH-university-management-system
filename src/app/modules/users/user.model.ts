import { Schema, model } from "mongoose";
import { TUser, userModel } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser, userModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// middleware "per"
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_routs)
  );
  next();
});

// middleware "post"
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await User.findOne({ id });
};

userSchema.statics.isPasswordMashed = async function (
  password: string,
  hashPassword: string
) {
  return await bcrypt.compare(password, hashPassword);
};

export const User = model<TUser, userModel>("User", userSchema);
