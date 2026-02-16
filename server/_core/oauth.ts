import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

export function registerOAuthRoutes(app: Express) {
  // Simple login endpoint
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    try {
      const userInfo = await sdk.loginWithCredentials(email, password);

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: email,
        loginMethod: "email",
        lastSignedIn: new Date(),
        role: userInfo.role as any,
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({ success: true, user: { name: userInfo.name, role: userInfo.role } });
    } catch (error: any) {
      console.error("[Auth] Login failed", error);
      res.status(401).json({ error: error.message || "Login failed" });
    }
  });

  // Keep the old callback route for backward compatibility (returns 404)
  app.get("/api/oauth/callback", (_req: Request, res: Response) => {
    res.redirect(302, "/");
  });
}
