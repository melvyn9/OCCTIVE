import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSS6rL8L7-EZNE9qQHbA18j3gcUAvWLQ2B5TnloSPkxQR4iKvDMJxp-UFOdsFlGhjM0x47pUK4gcuC2/pub?gid=920052474&single=true&output=csv';

interface Row {
  id: string;
  title: string;
  parent_ids: string;
}

export function useGraphFromSheet() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  useEffect(() => {
    fetch(CSV_URL)
      .then((res) => res.text())
      .then((csv) => Papa.parse<Row>(csv, {
        header: true,
        skipEmptyLines: true,
        complete: ({ data }) => {
          const n: any[] = [];
          const e: any[] = [];

          data.forEach((r) => {
            if (!r.id) return;

            /** prefix before the first digit, eg "A", "B", "C" */
            const group = (r.id.match(/^[A-Za-z]+/) ?? [''])[0];

            n.push({
              id: r.id,
              data: { label: r.title, group },
            });

            r.parent_ids
              ?.split(',')
              .filter(Boolean)
              .forEach((p) => e.push({ id: `${p}->${r.id}`, source: p, target: r.id }));
          });

          setNodes(n);
          setEdges(e);
        },
      }))
      .catch((err) => console.error('CSV fetch/parse error', err));
  }, []);

  return { nodes, edges };
}
