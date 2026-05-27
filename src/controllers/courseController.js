import { courseService } from "../courses/course.service.js";
// import asyncHandler from "../utils/asyncHandler.js";
import { AppError } from "../middlewares/globalErrorHandler.js";

const createNewCourse = async (req, res) => {
  if (!req.body.name) {
    throw new AppError("Course name is required", 400);
  }

  const course = await courseService.createCourse(req.body);

  res.status(200).json({
    success: true,
    data: course,
    message: "Course created successfully",
  });
};

const getAllCourses = async (req, res) => {
  const courses = await courseService.getAllCourses(req.query);
  res.status(200).json({
    success: true,
    data: courses,
    message: "Courses fetched successfully",
  });
};

const getCourseById = async (req, res) => {
  const courseId = Number(req.params.id);
  const course = await courseService.getCourseById(courseId);
  res.status(200).json({
    success: true,
    data: course,
    message: "Course read successfully",
  });
};

const deleteCourseById = async (req, res) => {
  const courseId = Number(req.params.id);
  await courseService.deleteCourse(courseId);
  res.status(200).json({
    success: true,
    message: "Course deleted successfully",
  });
};

export { createNewCourse, getAllCourses, getCourseById, deleteCourseById };
