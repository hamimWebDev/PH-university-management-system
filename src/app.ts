import cors from "cors";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFount } from "./app/middlewares/notFound";
import { router } from "./app/routes";

const app: Application = express();

//parsers
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// application routes
app.use("/api/v1", router);

const test = async (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", test);

app.use(globalErrorHandler);

// not fount
app.use(notFount);
export default app;
