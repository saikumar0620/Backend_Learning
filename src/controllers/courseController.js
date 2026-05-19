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

export { createNewCourse };