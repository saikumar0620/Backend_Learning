import { courseRepository } from "./course.repository.js";
import { AppError } from "../middlewares/globalErrorHandler.js";



export const courseService = {
  // CREATE
  async createCourse(dto) {
    // BUSINESS RULE 1: No duplicate course names
    const existing = await courseRepository.findByName(dto.name);

    if (existing) {
      throw new AppError(`A course named "${dto.name}" already exists`, 400);
    }

    // BUSINESS RULE 2: Price must be positive
    if (dto.price <= 0) {
      throw new AppError("Price must be greater than 0", 400);
    }

    return courseRepository.create({
      course_name: dto.name,
      description: dto.description,
      price: dto.price,
      isPublished: dto.isPublished ?? false,
    });
  },

  // GET ALL
  async getAllCourses(filters = {}) {
    // BUSINESS RULE: Prevent massive queries
    const limit = filters.limit ? Number(filters.limit) : 20;
    const page = filters.page ? Number(filters.page) : 1;
    const safeLimit = Math.min(limit, 100);

    return courseRepository.findAll({
      ...filters,
      page,
      limit: safeLimit,
    });
  },

  // GET ONE
  async getCourseById(id) {
    const course = await courseRepository.findById(id);

    if (!course) {
      throw new AppError(`Course with id ${id} not found`, 404);
    }

    return course;
  },

  // UPDATE
  async updateCourse(id, dto) {
    // BUSINESS RULE: Course must exist
    const existing = await courseRepository.findById(id);

    if (!existing) {
      throw new AppError(`Course with id ${id} not found`, 404);
    }

    // BUSINESS RULE: Prevent duplicate names
    if (dto.name && dto.name !== existing.name) {
      const nameConflict = await courseRepository.findByName(dto.name);

      if (nameConflict) {
        throw new AppError(`A course named "${dto.name}" already exists`, 400);
      }
    }

    // BUSINESS RULE: Price must stay positive
    // if (dto.price !== undefined && dto.price <= 0) {
    //   throw new AppError("Price must be greater than 0", 400);
    // }

    // BUSINESS RULE: Course needs modules before publishing
    // if (dto.isPublished === true && !existing.isPublished) {
    //   const courseModules = await moduleRepository.findByCourseId(id);

    //   if (courseModules.length === 0) {
    //     throw new AppError("Cannot publish a course with no modules", 400);
    //   }
    // }

    const updateData = { ...dto };

    if (dto.price !== undefined) {
      updateData.price = dto.price;
    }
    if (dto.name !== undefined) {
      updateData.course_name = dto.name;
      delete updateData.name;
    }

    return courseRepository.update(id, updateData);
  },

  // DELETE
  async deleteCourse(id) {
    const existing = await courseRepository.findById(id);

    if (!existing) {
      throw new AppError(`Course with id ${id} not found`, 404);
    }

    // BUSINESS RULE: Published courses cannot be deleted
    // if (existing.isPublished === false) {
    //   throw new AppError("Cannot delete a published course. Unpublish it first.", 400);
    // }

    return courseRepository.remove(id);
  },
};
