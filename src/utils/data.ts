import Papa from 'papaparse';
import { LOCAL_CSV_BY_GID, GSHEETS_BASE_CSV } from '../config/dataSources';

export enum DataTypes {
  Videos = '746603396',
  Units = '2013487824',
}

export interface Videos {
  name: string;
  description: string;
  note: string;
  links: { title: string; url: string }[];

  subunit1: string;
  subunit1Video1: string;
  subunit1Video1Url: string;
  subunit1Video2: string;
  subunit1Video2Url: string;
  subunit1Video3: string;
  subunit1Video3Url: string;

  subunit2: string;
  subunit2Video1: string;
  subunit2Video1Url: string;
  subunit2Video2: string;
  subunit2Video2Url: string;
  subunit2Video3: string;
  subunit2Video3Url: string;

  subunit3: string;
  subunit3Video1: string;
  subunit3Video1Url: string;
  subunit3Video2: string;
  subunit3Video2Url: string;
  subunit3Video3: string;
  subunit3Video3Url: string;

}

/** Load from local backup (public/data/*.csv) and cache if present */
function parseLocalAndCache(gid: DataTypes, onDone: (rows: any[]) => void, onFail: (e: any) =>
  void) {
  const localUrl = (LOCAL_CSV_BY_GID as Record<string, string>)[gid as unknown as string];
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
  return Array.isArray(rows) && rows.some((row) => row && Object.values(row).some((v) => v !== '' && v != null));
}

export const useData = (gid: DataTypes): Promise<Array<any>> => new Promise((resolve, reject) => {
  const cacheData = sessionStorage.getItem(gid);

  if (cacheData) {
    resolve(JSON.parse(cacheData));
    return;
  }

  const prefetch = () => {
    Object.keys(DataTypes).forEach((type) => {
      if (DataTypes[type] !== gid) {
        Papa.parse<any>(`${GSHEETS_BASE_CSV}&gid=${DataTypes[type]}`, {
          download: true,
          header: true,
          complete: (results) => {
            const { data } = results;
            if (data.length !== 0) {
              sessionStorage.setItem(DataTypes[type], JSON.stringify(data));
            } else {
              // Empty remote → try local for this gid
              parseLocalAndCache(DataTypes[type] as DataTypes, () => {}, () => {});
            }
          },
          error: () => {
            // Remote failed → try local; ignore errors here (prefetch is best-effort)
            parseLocalAndCache(DataTypes[type] as DataTypes, () => {}, () => {});
          },
        });
      }
    });
  };
  Papa.parse<any>(`${GSHEETS_BASE_CSV}&gid=${gid}`, {
    download: true,
    header: true,
    complete: (results) => {
      const { data } = results;

      if (data.length !== 0 && hasRealData(data)) {
        sessionStorage.setItem(gid, JSON.stringify(data));
        prefetch();
        resolve(data);
        return;
      }
      // Remote returned empty/blank rows → fall back to local
      parseLocalAndCache(
        gid,
        (local) => {
          prefetch();
          resolve(local);
        },
        (err) => {
          prefetch();
          reject(err);
        },
      );
    },
    error: () => {
      // Remote failed → fall back to local
      parseLocalAndCache(
        gid,
        (local) => {
          prefetch();
          resolve(local);
        },
        (err) => {
          prefetch();
          reject(err);
        },
      );
    },
  });
});
