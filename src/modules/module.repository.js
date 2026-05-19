import { eq, count, asc, and, gt, max, sql } from 'drizzle-orm';
import { db } from '@/db';
import { modules } from '@/db/schema';

export const moduleRepository = {

  // CREATE
  async create(data) {
    const [module] = await db
      .insert(modules)
      .values(data)
      .returning();

    if (!module) {
      throw new Error('Failed to create module');
    }

    return module;
  },

  // FIND ALL BY COURSE (with pagination)
  async findByCourseId(courseId, page, limit) {

    // Paginated version
    if (page !== undefined && limit !== undefined) {
      const offset = (page - 1) * limit;

      const [data, countResult] = await Promise.all([
        db
          .select()
          .from(modules)
          .where(eq(modules.courseId, courseId))
          .orderBy(asc(modules.order))
          .limit(limit)
          .offset(offset),

        db
          .select({ total: count() })
          .from(modules)
          .where(eq(modules.courseId, courseId)),
      ]);

      return {
        data,
        total: Number(countResult[0]?.total ?? 0),
        page,
        limit,
      };
    }

    // Non-paginated version
    return db
      .select()
      .from(modules)
      .where(eq(modules.courseId, courseId))
      .orderBy(asc(modules.order));
  },

  // FIND ONE BY ID
  async findById(id) {
    const [module] = await db
      .select()
      .from(modules)
      .where(eq(modules.id, id));

    return module ?? null;
  },

  // FIND MAX ORDER
  async findMaxOrder(courseId) {
    const [result] = await db
      .select({
        maxOrder: max(modules.order),
      })
      .from(modules)
      .where(eq(modules.courseId, courseId));

    return result?.maxOrder ?? 0;
  },

  // UPDATE
  async update(id, data) {
    const [updated] = await db
      .update(modules)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(modules.id, id))
      .returning();

    return updated ?? null;
  },

  // DELETE
  async remove(id) {
    const [deleted] = await db
      .delete(modules)
      .where(eq(modules.id, id))
      .returning();

    return deleted ?? null;
  },

  // REORDER AFTER DELETE
  async reorderAfterDelete(courseId, deletedOrder) {
    await db
      .update(modules)
      .set({
        order: sql`${modules.order} - 1`,
      })
      .where(
        and(
          eq(modules.courseId, courseId),
          gt(modules.order, deletedOrder)
        )
      );
  },
};