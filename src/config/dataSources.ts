// src/config/dataSources.ts

// One place for all CSV links (remote + local)

// Base "publish to web" CSV URL
export const GSHEETS_BASE_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSS6rL8L7-EZNE9qQHbA18j3gcUAvWLQ2B5TnloSPkxQR4iKvDMJxp-UFOdsFlGhjM0x47pUK4gcuC2/pub?output=csv';

// GIDs for each sheet/tab
export const CSV_GIDS = {
  Videos: '2013487824',
  DependencyGraph: '920052474',
} as const;

// Public base (works in CRA, Vite, GH Pages) //
const BASE_URL = (typeof import.meta !== 'undefined' && (import.meta as any)?.env?.BASE_URL)
  // CRA
  || (typeof process !== 'undefined' && (process as any)?.env?.PUBLIC_URL)
  || '/';

const prefix = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

// Local fallback paths (served from /public)
export const LOCAL_CSV_BY_GID: Record<string, string> = {
  [CSV_GIDS.Videos]: `${prefix}data/videos.csv`,
  [CSV_GIDS.DependencyGraph]: `${prefix}data/dependency_graph.csv`,
};

// Helper for remote URL by gid (useful outside data.ts)
export const remoteCsvUrlByGid = (gid: string) => `${GSHEETS_BASE_CSV}&gid=${gid}`;
