import { Router } from "express";
import { createNewCourse, deleteCourseById } from "../controllers/courseController.js";
import { getAllCourses } from "../controllers/courseController.js";
import { getCourseById } from "../controllers/courseController.js";


const courseRouter = Router();
courseRouter.post("/", createNewCourse);
courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.delete("/:id", deleteCourseById);


export default courseRouter;
