import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  course_name: varchar("name", { length: 255 }).notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
export { courses };

// import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
