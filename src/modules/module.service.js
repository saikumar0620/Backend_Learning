import { moduleRepository } from './module.repository.js';
import { courseRepository } from '@/courses/course.repository.js';

export const moduleService = {

  // CREATE
  async createModule(dto) {

    // BUSINESS RULE: Course must exist before adding modules
    const course = await courseRepository.findById(dto.courseId);

    if (!course) {
      throw new Error(`Course with id ${dto.courseId} not found`);
    }

    // BUSINESS RULE: Auto assign order if not provided
    let order = dto.order;

    if (order === undefined) {
      const maxOrder = await moduleRepository.findMaxOrder(dto.courseId);
      order = maxOrder + 1;
    }

    return moduleRepository.create({
      courseId: dto.courseId,
      title: dto.title,
      order,
    });
  },

  // GET ALL FOR A COURSE
  async getModulesByCourse(courseId, page, limit) {

    // BUSINESS RULE: Course must exist
    const course = await courseRepository.findById(courseId);

    if (!course) {
      throw new Error(`Course with id ${courseId} not found`);
    }

    const safeLimit = Math.min(limit, 50);

    return moduleRepository.findByCourseId(
      courseId,
      page,
      safeLimit
    );
  },

  // GET ONE
  async getModuleById(id) {

    const module = await moduleRepository.findById(id);

    if (!module) {
      throw new Error(`Module with id ${id} not found`);
    }

    return module;
  },

  // UPDATE
  async updateModule(id, dto) {

    const existing = await moduleRepository.findById(id);

    if (!existing) {
      throw new Error(`Module with id ${id} not found`);
    }

    // BUSINESS RULE: Order must be positive
    if (dto.order !== undefined && dto.order < 1) {
      throw new Error('Module order must be at least 1');
    }

    return moduleRepository.update(id, dto);
  },

  // DELETE
  async deleteModule(id) {

    const existing = await moduleRepository.findById(id);

    if (!existing) {
      throw new Error(`Module with id ${id} not found`);
    }

    const deleted = await moduleRepository.remove(id);

    // BUSINESS RULE:
    // Re-number remaining modules after delete
    await moduleRepository.reorderAfterDelete(
      existing.courseId,
      existing.order
    );

    return deleted;
  },
};