import { lessonRepository } from './lesson.repository.js';
import { moduleRepository } from '@/modules/module.repository.js';

export const lessonService = {

  // CREATE
  async createLesson(dto) {
    // BUSINESS RULE: The module must exist
    const module = await moduleRepository.findById(dto.moduleId);

    if (!module) {
      throw new Error(`Module with id ${dto.moduleId} not found`);
    }

    // BUSINESS RULE: A lesson must have either content OR video URL
    if (!dto.content && !dto.videoUrl) {
      throw new Error('A lesson must have either content or a video URL');
    }

    // BUSINESS RULE: Duration must be positive
    if (
      dto.durationMinutes !== undefined &&
      dto.durationMinutes <= 0
    ) {
      throw new Error(
        'Duration must be a positive number of minutes'
      );
    }

    // Auto assign order
    let order = dto.order;

    if (order === undefined) {
      const maxOrder = await lessonRepository.findMaxOrder(
        dto.moduleId
      );

      order = maxOrder + 1;
    }

    return lessonRepository.create({
      moduleId: dto.moduleId,
      title: dto.title,
      content: dto.content ?? null,
      videoUrl: dto.videoUrl ?? null,
      order,
      durationMinutes: dto.durationMinutes ?? null,
    });
  },

  // GET ALL FOR MODULE
  async getLessonsByModule(moduleId, page, limit) {
    const module = await moduleRepository.findById(moduleId);

    if (!module) {
      throw new Error(`Module with id ${moduleId} not found`);
    }

    const safeLimit = Math.min(limit, 50);

    return lessonRepository.findByModuleId(
      moduleId,
      page,
      safeLimit
    );
  },

  // GET ONE
  async getLessonById(id) {
    const lesson = await lessonRepository.findById(id);

    if (!lesson) {
      throw new Error(`Lesson with id ${id} not found`);
    }

    return lesson;
  },

  // UPDATE
  async updateLesson(id, dto) {
    const existing = await lessonRepository.findById(id);

    if (!existing) {
      throw new Error(`Lesson with id ${id} not found`);
    }

    if (
      dto.durationMinutes !== undefined &&
      dto.durationMinutes <= 0
    ) {
      throw new Error(
        'Duration must be a positive number of minutes'
      );
    }

    return lessonRepository.update(id, dto);
  },

  // DELETE
  async deleteLesson(id) {
    const existing = await lessonRepository.findById(id);

    if (!existing) {
      throw new Error(`Lesson with id ${id} not found`);
    }

    const deleted = await lessonRepository.remove(id);

    // Re-number remaining lessons
    await lessonRepository.reorderAfterDelete(
      existing.moduleId,
      existing.order
    );

    return deleted;
  },
};