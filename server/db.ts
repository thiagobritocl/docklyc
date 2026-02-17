import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  workAreas,
  boardingSteps,
  requirements,
  salaryData,
  fraudSignals,
  myths,
  legalDisclaimers,
  aboutPage,
  auditLog,
  dynamicPages,
  type WorkArea,
  type BoardingStep,
  type Requirement,
  type SalaryData,
  type FraudSignal,
  type Myth,
  type LegalDisclaimer,
  type AboutPage,
  type DynamicPage,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================
// CMS QUERY HELPERS
// ============================================

// Work Areas
export async function getWorkAreas() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(workAreas).where(eq(workAreas.isActive, true)).orderBy(workAreas.order);
}

export async function getWorkAreaById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(workAreas).where(eq(workAreas.id, id)).limit(1);
  return result[0];
}

export async function createWorkArea(data: Omit<WorkArea, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(workAreas).values(data);
  return result;
}

export async function updateWorkArea(id: number, data: Partial<Omit<WorkArea, 'id' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(workAreas).set(data).where(eq(workAreas.id, id));
}

export async function deleteWorkArea(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(workAreas).set({ isActive: false }).where(eq(workAreas.id, id));
}

// Boarding Steps
export async function getBoardingSteps() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(boardingSteps).where(eq(boardingSteps.isActive, true)).orderBy(boardingSteps.order);
}

export async function createBoardingStep(data: Omit<BoardingStep, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(boardingSteps).values(data);
}

export async function updateBoardingStep(id: number, data: Partial<Omit<BoardingStep, 'id' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(boardingSteps).set(data).where(eq(boardingSteps.id, id));
}

export async function deleteBoardingStep(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(boardingSteps).set({ isActive: false }).where(eq(boardingSteps.id, id));
}

// Requirements
export async function getRequirements(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db.select().from(requirements).where(eq(requirements.category, category)).orderBy(requirements.order);
  }
  return db.select().from(requirements).where(eq(requirements.isActive, true)).orderBy(requirements.order);
}

export async function createRequirement(data: Omit<Requirement, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(requirements).values(data);
}

export async function updateRequirement(id: number, data: Partial<Omit<Requirement, 'id' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(requirements).set(data).where(eq(requirements.id, id));
}

export async function deleteRequirement(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(requirements).set({ isActive: false }).where(eq(requirements.id, id));
}

// Salary Data
export async function getSalaryData() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(salaryData).where(eq(salaryData.isActive, true)).orderBy(salaryData.order);
}

export async function createSalaryEntry(data: Omit<SalaryData, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(salaryData).values(data);
}

export async function updateSalaryEntry(id: number, data: Partial<Omit<SalaryData, 'id' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(salaryData).set(data).where(eq(salaryData.id, id));
}

export async function deleteSalaryEntry(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(salaryData).set({ isActive: false }).where(eq(salaryData.id, id));
}

// Fraud Signals
export async function getFraudSignals(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return db.select().from(fraudSignals).where(eq(fraudSignals.category, category)).orderBy(fraudSignals.order);
  }
  return db.select().from(fraudSignals).where(eq(fraudSignals.isActive, true)).orderBy(fraudSignals.order);
}

export async function createFraudSignal(data: Omit<FraudSignal, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(fraudSignals).values(data);
}

export async function updateFraudSignal(id: number, data: Partial<Omit<FraudSignal, 'id' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(fraudSignals).set(data).where(eq(fraudSignals.id, id));
}

export async function deleteFraudSignal(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(fraudSignals).set({ isActive: false }).where(eq(fraudSignals.id, id));
}

// Myths
export async function getMyths() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(myths).where(eq(myths.isActive, true)).orderBy(myths.order);
}

export async function createMyth(data: Omit<Myth, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(myths).values(data);
}

export async function updateMyth(id: number, data: Partial<Omit<Myth, 'id' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(myths).set(data).where(eq(myths.id, id));
}

export async function deleteMyth(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(myths).set({ isActive: false }).where(eq(myths.id, id));
}

// Legal Disclaimers
export async function getLegalDisclaimers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(legalDisclaimers).where(eq(legalDisclaimers.isActive, true));
}

export async function getLegalDisclaimerByKey(key: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(legalDisclaimers).where(eq(legalDisclaimers.key, key)).limit(1);
  return result[0];
}

export async function createLegalDisclaimer(data: Omit<LegalDisclaimer, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(legalDisclaimers).values(data);
}

export async function updateLegalDisclaimer(key: string, data: Partial<Omit<LegalDisclaimer, 'id' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(legalDisclaimers).set(data).where(eq(legalDisclaimers.key, key));
}

export async function deleteLegalDisclaimer(key: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(legalDisclaimers).set({ isActive: false }).where(eq(legalDisclaimers.key, key));
}

// About Page
export async function getAboutPage() {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(aboutPage).limit(1);
  return result[0];
}

export async function updateAboutPage(data: Partial<Omit<AboutPage, 'id' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getAboutPage();
  if (existing) {
    return db.update(aboutPage).set(data).where(eq(aboutPage.id, existing.id));
  } else {
    return db.insert(aboutPage).values(data as any);
  }
}

// ============ Dynamic Pages ============
export async function getDynamicPages(onlyInMenu = false) {
  const db = await getDb();
  if (!db) return [];
  const query = db.select().from(dynamicPages).where(eq(dynamicPages.isActive, true));
  if (onlyInMenu) {
    return query.where(eq(dynamicPages.showInMenu, true)).orderBy(dynamicPages.order);
  }
  return query.orderBy(dynamicPages.order);
}

export async function getDynamicPageBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(dynamicPages).where(eq(dynamicPages.slug, slug)).limit(1);
  return result[0];
}

export async function createDynamicPage(data: Omit<DynamicPage, 'id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(dynamicPages).values(data);
}

export async function updateDynamicPage(id: number, data: Partial<Omit<DynamicPage, 'id' | 'createdAt'>>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(dynamicPages).set(data).where(eq(dynamicPages.id, id));
}

export async function deleteDynamicPage(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(dynamicPages).set({ isActive: false }).where(eq(dynamicPages.id, id));
}
