import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import {
  getWorkAreas,
  getWorkAreaById,
  createWorkArea,
  updateWorkArea,
  deleteWorkArea,
  getBoardingSteps,
  createBoardingStep,
  updateBoardingStep,
  deleteBoardingStep,
  getRequirements,
  createRequirement,
  updateRequirement,
  deleteRequirement,
  getSalaryData,
  createSalaryEntry,
  updateSalaryEntry,
  deleteSalaryEntry,
  getFraudSignals,
  createFraudSignal,
  updateFraudSignal,
  deleteFraudSignal,
  getMyths,
  createMyth,
  updateMyth,
  deleteMyth,
  getLegalDisclaimers,
  getLegalDisclaimerByKey,
  createLegalDisclaimer,
  updateLegalDisclaimer,
  deleteLegalDisclaimer,
  getAboutPage,
  updateAboutPage,
} from "../db";
import { TRPCError } from "@trpc/server";
import { seedDatabase } from "../seed";

// Helper to ensure admin access
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user?.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

// Validation schemas
const workAreaSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  functions: z.string(), // JSON string
  requirements: z.string(), // JSON string
  entryLevel: z.enum(["entry-level", "experienced"]),
  order: z.number().default(0),
});

const boardingStepSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  approximateTime: z.string().min(1),
  commonErrors: z.string(), // JSON
  candidateActions: z.string(), // JSON
  shipperRequests: z.string(), // JSON
  order: z.number().default(0),
});

const requirementSchema = z.object({
  category: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().default(0),
});

const salarySchema = z.object({
  department: z.string().min(1),
  position: z.string().min(1),
  minSalary: z.number().min(0),
  maxSalary: z.number().min(0),
  tips: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  order: z.number().default(0),
});

const fraudSignalSchema = z.object({
  signal: z.string().min(1),
  category: z.enum(["red_flag", "illegal_charge", "verification_tip"]),
  order: z.number().default(0),
});

const mythSchema = z.object({
  title: z.string().min(1),
  verdict: z.enum(["Verdadero", "Falso"]),
  shortDescription: z.string().min(1),
  detailedExplanation: z.string().min(1),
  details: z.string(), // JSON array
  order: z.number().default(0),
});

export const cmsRouter = router({
  // ============ Seed Database ============
  seed: adminProcedure.mutation(async () => {
    await seedDatabase();
    return { success: true, message: "Database seeded successfully" };
  }),

  // ============ Public Routes (no auth required) ============
  public: router({
    workAreas: publicProcedure.query(() => getWorkAreas()),
    boardingSteps: publicProcedure.query(() => getBoardingSteps()),
    requirements: publicProcedure.input(z.object({ category: z.string().optional() }).optional()).query(({ input }) => getRequirements(input?.category)),
    salaries: publicProcedure.query(() => getSalaryData()),
    fraudSignals: publicProcedure.input(z.object({ category: z.string().optional() }).optional()).query(({ input }) => getFraudSignals(input?.category)),
    myths: publicProcedure.query(() => getMyths()),
    disclaimers: publicProcedure.query(() => getLegalDisclaimers()),
    disclaimer: publicProcedure.input(z.object({ key: z.string() })).query(({ input }) => getLegalDisclaimerByKey(input.key)),
  }),

  // ============ Work Areas ============
  workAreas: router({
    list: protectedProcedure.query(() => getWorkAreas()),
    get: protectedProcedure.input(z.object({ id: z.number() })).query(({ input }) => getWorkAreaById(input.id)),
    create: adminProcedure.input(workAreaSchema).mutation(async ({ input }) => {
      return createWorkArea({
        ...input,
        isActive: true,
      });
    }),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: workAreaSchema.partial() }))
      .mutation(async ({ input }) => {
        return updateWorkArea(input.id, input.data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return deleteWorkArea(input.id);
    }),
  }),

  // ============ Boarding Steps ============
  boardingSteps: router({
    list: protectedProcedure.query(() => getBoardingSteps()),
    create: adminProcedure.input(boardingStepSchema).mutation(async ({ input }) => {
      return createBoardingStep({
        ...input,
        isActive: true,
      });
    }),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: boardingStepSchema.partial() }))
      .mutation(async ({ input }) => {
        return updateBoardingStep(input.id, input.data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return deleteBoardingStep(input.id);
    }),
  }),

  // ============ Requirements ============
  requirements: router({
    list: protectedProcedure.input(z.object({ category: z.string().optional() }).optional()).query(({ input }) => {
      return getRequirements(input?.category);
    }),
    create: adminProcedure.input(requirementSchema).mutation(async ({ input }) => {
      return createRequirement({
        ...input,
        isActive: true,
      });
    }),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: requirementSchema.partial() }))
      .mutation(async ({ input }) => {
        return updateRequirement(input.id, input.data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return deleteRequirement(input.id);
    }),
  }),

  // ============ Salary Data ============
  salaries: router({
    list: protectedProcedure.query(() => getSalaryData()),
    create: adminProcedure.input(salarySchema).mutation(async ({ input }) => {
      return createSalaryEntry({
        ...input,
        isActive: true,
        tips: input.tips || null,
        notes: input.notes || null,
      });
    }),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: salarySchema.partial() }))
      .mutation(async ({ input }) => {
        return updateSalaryEntry(input.id, input.data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return deleteSalaryEntry(input.id);
    }),
  }),

  // ============ Fraud Signals ============
  fraudSignals: router({
    list: protectedProcedure.input(z.object({ category: z.string().optional() }).optional()).query(({ input }) => {
      return getFraudSignals(input?.category);
    }),
    create: adminProcedure.input(fraudSignalSchema).mutation(async ({ input }) => {
      return createFraudSignal({
        ...input,
        isActive: true,
      });
    }),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: fraudSignalSchema.partial() }))
      .mutation(async ({ input }) => {
        return updateFraudSignal(input.id, input.data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return deleteFraudSignal(input.id);
    }),
  }),

  // ============ Myths ============
  myths: router({
    list: protectedProcedure.query(() => getMyths()),
    create: adminProcedure.input(mythSchema).mutation(async ({ input }) => {
      return createMyth({
        ...input,
        isActive: true,
      });
    }),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: mythSchema.partial() }))
      .mutation(async ({ input }) => {
        return updateMyth(input.id, input.data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
      return deleteMyth(input.id);
    }),
  }),

  // ============ Legal Disclaimers ============
  disclaimers: router({
    list: protectedProcedure.query(() => getLegalDisclaimers()),
    get: protectedProcedure.input(z.object({ key: z.string() })).query(({ input }) => {
      return getLegalDisclaimerByKey(input.key);
    }),
    create: adminProcedure
      .input(
        z.object({
          key: z.string().min(1),
          title: z.string().min(1),
          content: z.string().min(1),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return createLegalDisclaimer({
          key: input.key,
          title: input.title,
          content: input.content,
          isActive: input.isActive ?? true,
        });
      }),
    update: adminProcedure
      .input(
        z.object({
          key: z.string(),
          data: z.object({
            title: z.string().optional(),
            content: z.string().optional(),
            isActive: z.boolean().optional(),
          }),
        })
      )
      .mutation(async ({ input }) => {
        return updateLegalDisclaimer(input.key, input.data);
      }),
    delete: adminProcedure
      .input(z.object({ key: z.string() }))
      .mutation(async ({ input }) => {
        return deleteLegalDisclaimer(input.key);
      }),
  }),

  // ============ About Page ============
  about: router({
    get: protectedProcedure.query(() => getAboutPage()),
    update: adminProcedure
      .input(
        z.object({
          whatIsDockly: z.string().optional(),
          whatDocklyDoes: z.string().optional(),
          whatDocklyDoesNot: z.string().optional(),
          ethicalCommitment: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return updateAboutPage(input);
      }),
  }),
});
