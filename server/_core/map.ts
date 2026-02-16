/**
 * Google Maps API Integration
 * Uses Google Maps API directly (requires GOOGLE_MAPS_API_KEY env var)
 */

import { ENV } from "./env";

type MapsConfig = {
  apiKey: string;
};

function getMapsConfig(): MapsConfig {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || "";
  if (!apiKey) {
    throw new Error("Google Maps API key missing: set GOOGLE_MAPS_API_KEY environment variable");
  }
  return { apiKey };
}

interface RequestOptions {
  method?: "GET" | "POST";
  body?: Record<string, unknown>;
}

export async function makeRequest<T = unknown>(
  endpoint: string,
  params: Record<string, unknown> = {},
  options: RequestOptions = {}
): Promise<T> {
  const { apiKey } = getMapsConfig();

  const url = new URL(`https://maps.googleapis.com${endpoint}`);
  url.searchParams.append("key", apiKey);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  const response = await fetch(url.toString(), {
    method: options.method || "GET",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google Maps API request failed (${response.status} ${response.statusText}): ${errorText}`
    );
  }

  return (await response.json()) as T;
}

// Type definitions (kept for compatibility)
export type TravelMode = "driving" | "walking" | "bicycling" | "transit";
export type MapType = "roadmap" | "satellite" | "terrain" | "hybrid";
export type LatLng = { lat: number; lng: number };
