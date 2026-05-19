import router from "express";
import { createNewCourse } from "../controllers/courseController.js";
import { getAllCourses } from "../controllers/courseController.js";
import { getCourseById } from "../controllers/courseController.js";

const courseRouter = router();
courseRouter.post("/", createNewCourse);
courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);

export default courseRouter;