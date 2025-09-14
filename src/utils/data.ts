import Papa from 'papaparse';
import { CSV_GIDS, LOCAL_CSV_BY_GID, GSHEETS_BASE_CSV } from '../config/dataSources';

// Single source of truth comes from CSV_GIDS. We expose the same values here
// under the familiar "DataTypes" name, without duplicating the literal IDs.
export const DataTypes = {
  Videos: CSV_GIDS.Videos,
  Units: CSV_GIDS.Units,
  DependencyGraph: CSV_GIDS.DependencyGraph,
} as const;

export type DataType = typeof DataTypes[keyof typeof DataTypes];

/** Load from local backup (public/data/*.csv) and cache if present */
function parseLocalAndCache(
  gid: DataType,
  onDone: (rows: any[]) => void,
  onFail: (e: any) => void,
) {
  const localUrl = LOCAL_CSV_BY_GID[gid];
  if (!localUrl) {
    onFail(new Error(`No local CSV mapped for gid=${gid}`));
    return;
  }
  Papa.parse<any>(localUrl, {
    download: true,
    header: true,
    complete: ({ data }) => {
      if (data.length !== 0) {
        sessionStorage.setItem(gid, JSON.stringify(data));
      }
      // visibility for dev/testing
      // eslint-disable-next-line no-console
      console.warn(`[useData] Using local backup for gid=${gid} (${localUrl})`);
      onDone(data);
    },
    error: onFail,
  });
}

function hasRealData(rows: any[]): boolean {
  return Array.isArray(rows)
    && rows.some((row) => row && Object.values(row).some((v) => v !== '' && v != null));
}

/**
 * Fetch CSV rows for a given sheet gid.
 * - Tries remote first, caches to sessionStorage
 * - If remote empty/fails → falls back to local backup
 * - Prefetches the other tabs in the background
 */
export const useData = (gid: DataType): Promise<any[]> => new Promise((resolve, reject) => {
  const cacheData = sessionStorage.getItem(gid);
  if (cacheData) {
    resolve(JSON.parse(cacheData));
    return;
  }

  const allGids = Object.values(DataTypes);
  const prefetchOthers = () => {
    allGids
      .filter((g) => g !== gid)
      .forEach((g) => {
        Papa.parse<any>(`${GSHEETS_BASE_CSV}&gid=${g}`, {
          download: true,
          header: true,
          complete: ({ data }) => {
            if (data.length !== 0) {
              sessionStorage.setItem(g, JSON.stringify(data));
            } else {
              // Empty remote → try local for this gid
              parseLocalAndCache(g, () => {}, () => {});
            }
          },
          error: () => {
            // Remote failed → try local; ignore errors here (prefetch is best-effort)
            parseLocalAndCache(g, () => {}, () => {});
          },
        } as Papa.ParseConfig<any>);
      });
  };

  Papa.parse<any>(`${GSHEETS_BASE_CSV}&gid=${gid}`, {
    download: true,
    header: true,
    complete: ({ data }) => {
      if (data.length !== 0 && hasRealData(data)) {
        sessionStorage.setItem(gid, JSON.stringify(data));
        prefetchOthers();
        resolve(data);
        return;
      }
      // Remote returned empty/blank rows → fall back to local
      parseLocalAndCache(
        gid,
        (local) => {
          prefetchOthers();
          resolve(local);
        },
        (err) => {
          prefetchOthers();
          reject(err);
        },
      );
    },
    error: () => {
      // Remote failed → fall back to local
      parseLocalAndCache(
        gid,
        (local) => {
          prefetchOthers();
          resolve(local);
        },
        (err) => {
          prefetchOthers();
          reject(err);
        },
      );
    },
  } as Papa.ParseConfig<any>);
});
