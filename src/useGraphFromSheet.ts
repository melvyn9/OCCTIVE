import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { CSV_GIDS, remoteCsvUrlByGid, LOCAL_CSV_BY_GID } from './config/dataSources';

const REMOTE_URL = remoteCsvUrlByGid(CSV_GIDS.DependencyGraph);
const LOCAL_URL = LOCAL_CSV_BY_GID[CSV_GIDS.DependencyGraph];

interface Row {
  id: string;
  title: string;
  parentIds: string;
  generation?: string;
}

export function useGraphFromSheet() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {
    const parse = (csv: string) => Papa.parse<Row>(csv, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => {
        const n: any[] = [];
        const e: any[] = [];

        data.forEach((r) => {
          if (!r.id) return;

          /** prefix before the first digit, eg "A", "B", "C" */
          const group = (r.id.match(/^[A-Za-z]+/) ?? [''])[0];

          // normalise generation (e.g., "O.1" | "O.2")
          const generation = (r.generation ?? '').trim().toUpperCase();
          n.push({
            id: r.id,
            data: { label: r.title, group, generation },
          });

          r.parentIds
            ?.split(',')
            .filter(Boolean)
            .forEach((p) => e.push({ id: `${p}->${r.id}`, source: p, target: r.id }));
        });

        setNodes(n);
        setEdges(e);

        // eslint-disable-next-line no-console
        console.debug('[useGraphFromSheet] generations seen:', Array.from(new Set(n.map((x) => x.data.generation))));
      },
    });

    // Try remote first; on failure, try local backup
    fetch(REMOTE_URL)
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(res.statusText))))
      .then((csv) => parse(csv))
      .catch(() => fetch(LOCAL_URL)
        .then((res) => res.text())
        .then((csv) => {
          // eslint-disable-next-line no-console
          console.warn('[useGraphFromSheet] Using local backup:', LOCAL_URL);
          parse(csv);
        })
        .catch((err) => console.error('CSV fetch/parse error', err)));
  }, []);

  return { nodes, edges };
}
