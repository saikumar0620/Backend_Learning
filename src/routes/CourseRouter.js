import { Router } from "express";
import { createNewCourse } from "../controllers/courseController.js";
import { getAllCourses } from "../controllers/courseController.js";
import { getCourseById } from "../controllers/courseController.js";
// import { removeCourseById } from "../controllers/courseController.js";

const courseRouter = Router();
courseRouter.post("/", createNewCourse);
courseRouter.get("/all", getAllCourses);
courseRouter.get("/:id", getCourseById);
// courseRouter.delete("/:id", removeCourseById);


export default courseRouter;
