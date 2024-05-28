import cors from "cors";
import express, { Application, Request, Response } from "express";
import { StudentRoutes } from "./app/modules/student/student.route";
import { userRoutes } from "./app/modules/users/user.routes";
import { globalErrorHandler } from "./app/middlwares/globalErrorHandler";
import { notFount } from "./app/middlwares/notFound";

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students", StudentRoutes);
app.use("/api/v1/users", userRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getAController);

app.use(globalErrorHandler);

// not fount
app.use(notFount);
export default app;
