import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

// Mock admin user context
function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@dockly.com",
      name: "Admin User",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

// Mock regular user context
function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "user@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("CMS Router", () => {
  describe("Work Areas", () => {
    it("should list work areas (protected)", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.workAreas.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should deny work area creation to non-admin users", async () => {
      const userCtx = createUserContext();
      const caller = appRouter.createCaller(userCtx);

      try {
        await caller.cms.workAreas.create({
          name: "Test Area",
          description: "Test",
          functions: "[]",
          requirements: "[]",
          entryLevel: "entry-level",
          order: 0,
        });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });

    it("should allow admin to create work area", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.workAreas.create({
        name: "Test Department",
        description: "A test department",
        functions: JSON.stringify(["Function 1", "Function 2"]),
        requirements: JSON.stringify(["Requirement 1"]),
        entryLevel: "entry-level",
        order: 1,
      });

      expect(result).toBeDefined();
    });
  });

  describe("Boarding Steps", () => {
    it("should list boarding steps (protected)", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.boardingSteps.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should deny boarding step creation to non-admin users", async () => {
      const userCtx = createUserContext();
      const caller = appRouter.createCaller(userCtx);

      try {
        await caller.cms.boardingSteps.create({
          title: "Test Step",
          description: "Test",
          approximateTime: "1 week",
          commonErrors: "[]",
          candidateActions: "[]",
          shipperRequests: "[]",
          order: 0,
        });
        expect.fail("Should have thrown FORBIDDEN error");
      } catch (error: any) {
        expect(error.code).toBe("FORBIDDEN");
      }
    });
  });

  describe("Requirements", () => {
    it("should list requirements (protected)", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.requirements.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should allow filtering requirements by category", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.requirements.list({ category: "general" });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Salary Data", () => {
    it("should list salary data (protected)", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.salaries.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should allow admin to create salary entry", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.salaries.create({
        department: "Hotel",
        position: "Stateroom Attendant",
        minSalary: 1200,
        maxSalary: 1800,
        tips: "Si (significativas)",
        order: 1,
      });

      expect(result).toBeDefined();
    });
  });

  describe("Fraud Signals", () => {
    it("should list fraud signals (protected)", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.fraudSignals.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should allow filtering fraud signals by category", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.fraudSignals.list({ category: "red_flag" });
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Myths", () => {
    it("should list myths (protected)", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.myths.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should allow admin to create myth", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.myths.create({
        title: "Test Myth",
        verdict: "Falso",
        shortDescription: "This is a test",
        detailedExplanation: "Detailed explanation here",
        details: JSON.stringify(["Point 1", "Point 2"]),
        order: 1,
      });

      expect(result).toBeDefined();
    });
  });

  describe("Legal Disclaimers", () => {
    it("should list disclaimers (protected)", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.disclaimers.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should allow admin to update disclaimer", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.disclaimers.update({
        key: "home_disclaimer",
        data: {
          title: "Updated Disclaimer",
          content: "Updated content",
        },
      });

      expect(result).toBeDefined();
    });
  });

  describe("About Page", () => {
    it("should get about page (protected)", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.about.get();
      // May be undefined if not initialized
      expect(result === undefined || typeof result === "object").toBe(true);
    });

    it("should allow admin to update about page", async () => {
      const adminCtx = createAdminContext();
      const caller = appRouter.createCaller(adminCtx);

      const result = await caller.cms.about.update({
        whatIsDockly: "Updated description",
        whatDocklyDoes: JSON.stringify(["Provide information"]),
        whatDocklyDoesNot: JSON.stringify(["Guarantee employment"]),
        ethicalCommitment: "We are committed to ethical practices",
      });

      expect(result).toBeDefined();
    });
  });

  describe("Authorization", () => {
    it("should deny all admin operations to non-admin users", async () => {
      const userCtx = createUserContext();
      const caller = appRouter.createCaller(userCtx);

      const operations = [
        () =>
          caller.cms.workAreas.create({
            name: "Test",
            description: "Test",
            functions: "[]",
            requirements: "[]",
            entryLevel: "entry-level" as const,
            order: 0,
          }),
        () =>
          caller.cms.workAreas.update({
            id: 1,
            data: { name: "Updated" },
          }),
        () => caller.cms.workAreas.delete({ id: 1 }),
      ];

      for (const op of operations) {
        try {
          await op();
          expect.fail("Should have thrown FORBIDDEN error");
        } catch (error: any) {
          expect(error.code).toBe("FORBIDDEN");
        }
      }
    });
  });
});
