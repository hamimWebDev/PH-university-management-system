import { Request, Response } from "express";
import httpStatus from "http-status";

export const notFount = (req: Request, res: Response) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API Not Fount",
    error: "",
  });
};
