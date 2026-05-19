import router from "express";
import {createNewCourse} from "../controllers/courseController.js";

const courseRouter = router();
courseRouter.post("/",createNewCourse);

export default courseRouter;