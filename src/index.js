import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const PORT = process.env.PORT 
app.use(express.json());
import courseRouter from "./routes/CourseRouter.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import globalErrorHandler from "./middlewares/globalErrorHandler.js";

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/courses/:id", courseRouter);


app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`)   
);