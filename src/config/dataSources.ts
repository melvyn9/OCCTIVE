// src/config/dataSources.ts

// One place for all CSV links (remote + local)

// Base "publish to web" CSV URL
export const GSHEETS_BASE_CSV = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTahKY3Cme2BAzFyWanEHiRq_ELhsUt1tMzdgi1e62AuL6ssZTpsfmfQTjVTFXc6U4BPPxS2KWpmHab/pub?output=csv';

// GIDs for each sheet/tab
export const CSV_GIDS = {
  Videos: '746603396',
  Units: '2013487824',
  DependencyGraph: '920052474',
} as const;

// Public base (CRA only, for static files in /public)
const BASE_URL = process.env.PUBLIC_URL || '/';
const prefix = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

// Local fallback paths (served from /public)
export const LOCAL_CSV_BY_GID: Record<string, string> = {
  [CSV_GIDS.Units]: `${prefix}data/units.csv`,
  [CSV_GIDS.Videos]: `${prefix}data/videos.csv`,
  [CSV_GIDS.DependencyGraph]: `${prefix}data/dependency_graph.csv`,
};

// Helper for remote URL by gid (useful outside data.ts)
export const remoteCsvUrlByGid = (gid: string) => `${GSHEETS_BASE_CSV}&gid=${gid}`;
