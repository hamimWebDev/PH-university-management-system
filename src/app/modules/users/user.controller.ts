import { Request, Response } from "express";
import { userServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;
    // -------------------------------------//
    // zod
    // const zodData = StudentSchemaZod.parse(studentData);
    const result = await userServices.createStudentIntoDB(
      password,
      studentData
    );

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });

    // -------------------------------------//
    // joi
    // const { error, value } = studentSchemaJoi.validate(studentData);
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something is wrong",
    //     error: error.details,
    //   });
    // } else {
    //   const result = await StudentServices.createStudentIntoDB(value);

    //   res.status(200).json({
    //     success: true,
    //     message: "Student is created successfully",
    //     data: result,
    //   });
    // }
    // -------------------------------------//
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something is wrong",
      error: err,
    });
  }
};

export const userControllers = {
  createStudent,
};
