import e, { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { StudentSchemaZod } from "./studentZodValidation";


const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // -------------------------------------//
    // zod
    const zodData = StudentSchemaZod.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(zodData);

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

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something is wrong",
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "Student is retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something is wrong",
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something is wrong",
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
