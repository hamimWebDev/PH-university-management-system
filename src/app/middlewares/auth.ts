import httpStatus from "http-status";
import { AppError } from "../errors/AppErrors";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { Request } from "express";

interface customRequest extends Request {
  user: JwtPayload;
}

export const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are send invalid authorized token"
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
        }
        req.user = decoded as JwtPayload;
        next();
      }
    );
  });
};
