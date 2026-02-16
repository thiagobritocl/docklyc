import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * ============================================
 * CMS TABLES FOR DOCKLY CONTENT MANAGEMENT
 * ============================================
 */

/**
 * Avisos legales y disclaimers
 */
export const legalDisclaimers = mysqlTable("legal_disclaimers", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 64 }).notNull().unique(), // e.g., "home_disclaimer", "salarios_disclaimer"
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LegalDisclaimer = typeof legalDisclaimers.$inferSelect;
export type InsertLegalDisclaimer = typeof legalDisclaimers.$inferInsert;

/**
 * Departamentos/Áreas de trabajo
 */
export const workAreas = mysqlTable("work_areas", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), // e.g., "Guest Services"
  description: text("description").notNull(),
  functions: text("functions").notNull(), // JSON array of functions
  requirements: text("requirements").notNull(), // JSON array of requirements
  entryLevel: varchar("entryLevel", { length: 50 }).notNull(), // "entry-level" | "experienced"
  order: int("order").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WorkArea = typeof workAreas.$inferSelect;
export type InsertWorkArea = typeof workAreas.$inferInsert;

/**
 * Pasos del proceso de embarque
 */
export const boardingSteps = mysqlTable("boarding_steps", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  approximateTime: varchar("approximateTime", { length: 100 }).notNull(), // e.g., "1-4 semanas"
  commonErrors: text("commonErrors").notNull(), // JSON array of errors
  candidateActions: text("candidateActions").notNull(), // JSON
  shipperRequests: text("shipperRequests").notNull(), // JSON
  order: int("order").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BoardingStep = typeof boardingSteps.$inferSelect;
export type InsertBoardingStep = typeof boardingSteps.$inferInsert;

/**
 * Requisitos generales y por departamento
 */
export const requirements = mysqlTable("requirements", {
  id: int("id").autoincrement().primaryKey(),
  category: varchar("category", { length: 100 }).notNull(), // "general" | "housekeeping" | "galley" etc.
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  order: int("order").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Requirement = typeof requirements.$inferSelect;
export type InsertRequirement = typeof requirements.$inferInsert;

/**
 * Salarios estimados por cargo y naviera
 */
export const salaryData = mysqlTable("salary_data", {
  id: int("id").autoincrement().primaryKey(),
  department: varchar("department", { length: 100 }).notNull(), // e.g., "Hotel/Housekeeping"
  position: varchar("position", { length: 255 }).notNull(), // e.g., "Stateroom Attendant"
  minSalary: int("minSalary").notNull(), // USD
  maxSalary: int("maxSalary").notNull(), // USD
  tips: varchar("tips", { length: 100 }), // "Si (significativas)" | "Limitadas" | "No"
  notes: text("notes"),
  order: int("order").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SalaryData = typeof salaryData.$inferSelect;
export type InsertSalaryData = typeof salaryData.$inferInsert;

/**
 * Señales de fraude y estafas
 */
export const fraudSignals = mysqlTable("fraud_signals", {
  id: int("id").autoincrement().primaryKey(),
  signal: text("signal").notNull(), // e.g., "Prometen embarque garantizado"
  category: varchar("category", { length: 50 }).notNull(), // "red_flag" | "illegal_charge" | "verification_tip"
  order: int("order").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FraudSignal = typeof fraudSignals.$inferSelect;
export type InsertFraudSignal = typeof fraudSignals.$inferInsert;

/**
 * Mitos y verdades
 */
export const myths = mysqlTable("myths", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(), // e.g., "Te haces rico rápido"
  verdict: varchar("verdict", { length: 50 }).notNull(), // "Verdadero" | "Falso"
  shortDescription: text("shortDescription").notNull(),
  detailedExplanation: text("detailedExplanation").notNull(),
  details: text("details").notNull(), // JSON array of bullet points
  order: int("order").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Myth = typeof myths.$inferSelect;
export type InsertMyth = typeof myths.$inferInsert;

/**
 * Página "Sobre Dockly"
 */
export const aboutPage = mysqlTable("about_page", {
  id: int("id").autoincrement().primaryKey(),
  whatIsDockly: text("whatIsDockly").notNull(),
  whatDocklyDoes: text("whatDocklyDoes").notNull(), // JSON array
  whatDocklyDoesNot: text("whatDocklyDoesNot").notNull(), // JSON array
  ethicalCommitment: text("ethicalCommitment").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AboutPage = typeof aboutPage.$inferSelect;
export type InsertAboutPage = typeof aboutPage.$inferInsert;

/**
 * Auditoría de cambios
 */
export const auditLog = mysqlTable("audit_log", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  action: varchar("action", { length: 100 }).notNull(), // "create" | "update" | "delete"
  entityType: varchar("entityType", { length: 100 }).notNull(), // "work_area" | "boarding_step" etc.
  entityId: int("entityId").notNull(),
  changes: text("changes"), // JSON of before/after
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLog.$inferSelect;
export type InsertAuditLog = typeof auditLog.$inferInsert;
