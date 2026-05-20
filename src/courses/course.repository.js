import { eq, ilike, count, desc, and } from "drizzle-orm";
import { db } from "../db/index.js";
import { courses } from "../db/schema/index.js";

export const courseRepository = {
  async create(data) {
    const [course] = await db.insert(courses).values(data).returning();

    if (!course) {
      throw new Error("Failed to create course");
    }

    return course;
  },

  async findAll(filters) {
    const { page, limit, search, isPublished } = filters;

    const offset = (page - 1) * limit;

    const conditions = [];

    if (search) {
      conditions.push(ilike(courses.course_name, `%${search}%`));
    }

    // if (isPublished !== undefined) {
    //   conditions.push(eq(courses.isPublished, isPublished));
    // }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, countResult] = await Promise.all([
      db
        .select()
        .from(courses)
        .where(whereClause)
        .orderBy(desc(courses.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ total: count() }).from(courses).where(whereClause),
    ]);

    return {
      data,
      total: Number(countResult[0]?.total ?? 0),
      page,
      limit,
    };
  },

  async findById(id) {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));

    return course ?? null;
  },

  async findByName(name) {
    const [course] = await db
      .select()
      .from(courses)
      .where(ilike(courses.course_name, name));

    return course ?? null;
  },


  async remove(id) {
    const [deleted] = await db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning();

    return deleted ?? null;
  },
};
