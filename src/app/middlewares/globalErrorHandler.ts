import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  // set default value
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";

  // handel error
  type TErrorSources = {
    path: number | string;
    message: string;
  }[];

  const errorSources: TErrorSources = [
    {
      path: "",
      message: "",
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 200;
    message = "ami zod error";
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    error: err,
  });
};
