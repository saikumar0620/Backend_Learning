import { eq, count, asc, max, sql, and, gt } from 'drizzle-orm';
import { db } from '@/db';
import { lessons } from '@/db/schema';

export const lessonRepository = {

  // CREATE
  async create(data) {
    const [lesson] = await db
      .insert(lessons)
      .values(data)
      .returning();

    if (!lesson) {
      throw new Error('Failed to create lesson');
    }

    return lesson;
  },

  // FIND ALL BY MODULE (paginated)
  async findByModuleId(moduleId, page, limit) {

    if (page !== undefined && limit !== undefined) {
      const offset = (page - 1) * limit;

      const [data, countResult] = await Promise.all([
        db
          .select()
          .from(lessons)
          .where(eq(lessons.moduleId, moduleId))
          .orderBy(asc(lessons.order))
          .limit(limit)
          .offset(offset),

        db
          .select({ total: count() })
          .from(lessons)
          .where(eq(lessons.moduleId, moduleId)),
      ]);

      return {
        data,
        total: Number(countResult[0]?.total ?? 0),
        page,
        limit,
      };
    }

    return await db
      .select()
      .from(lessons)
      .where(eq(lessons.moduleId, moduleId))
      .orderBy(asc(lessons.order));
  },

  // FIND ONE BY ID
  async findById(id) {
    const [lesson] = await db
      .select()
      .from(lessons)
      .where(eq(lessons.id, id));

    return lesson ?? null;
  },

  // FIND MAX ORDER IN A MODULE
  async findMaxOrder(moduleId) {
    const [result] = await db
      .select({ maxOrder: max(lessons.order) })
      .from(lessons)
      .where(eq(lessons.moduleId, moduleId));

    return result?.maxOrder ?? 0;
  },

  // UPDATE
  async update(id, data) {
    const [updated] = await db
      .update(lessons)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(lessons.id, id))
      .returning();

    return updated ?? null;
  },

  // DELETE
  async remove(id) {
    const [deleted] = await db
      .delete(lessons)
      .where(eq(lessons.id, id))
      .returning();

    return deleted ?? null;
  },

  // REORDER AFTER DELETE
  async reorderAfterDelete(moduleId, deletedOrder) {
    await db
      .update(lessons)
      .set({
        order: sql`${lessons.order} - 1`,
      })
      .where(
        and(
          eq(lessons.moduleId, moduleId),
          gt(lessons.order, deletedOrder)
        )
      );
  },
};