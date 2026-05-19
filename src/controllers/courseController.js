import Cources from "../db/cources.js";
import asyncHandler from "../utils/asyncHandler.js";

  const coursesInstance = new Cources();
const createNewCourse = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    throw new Error('Course name is required');
  }
    // Logic to create a new course
  res.status(200).json({
    success: true,
    data: req.body,
    message: "Course created successfully"
    })
});
    const getAllCourses = asyncHandler(async (req, res) => {
      const courses = coursesInstance.getAllCources();
      res.status(200).json({
        success: true,
        data: courses,
        message: "Courses fetched successfully"
      });
    });
    const getCourseById = asyncHandler(async (req, res) => {
      const courseId = req.params.id;
      const course = coursesInstance.getCourceById(courseId); 
      if (!course) {
        throw new Error('Course not found with this id');
      }
      res.status(200).json({
        success: true,
        data: course,
        message: "Course read successfully"
      });
    });
export { createNewCourse, getAllCourses, getCourseById };