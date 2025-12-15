// File: src/layout/components/UnitPage/index.tsx
// Displays all units with a sidebar for in-page navigation.

import React, { useEffect, useMemo, useState } from 'react';
import 'react-dropdown/style.css';
import UnitCard from '../UnitCard';
import { useData, DataTypes } from '../../../utils/data';
import './style.scss';
import { buildTopicColorList, buildTopicColorMap } from '../../../utils/topicColors';

/* eslint-disable camelcase */
type UnitRow = {
  unit_id: string;
  name: string;
  description: string;
  note?: string;
  order?: number | string;
  abbreviated_name?: string;
};

type VideoRow = {
  unit_id: string;
  video_order?: number | string;
  video_title: string;
  video_url: string;
  video_time?: string;
  video_desc?: string;
};
/* eslint-enable camelcase */

/* ------------------------------------------------------------------ */
/*                          HELPER FUNCTIONS                          */
/* ------------------------------------------------------------------ */

function cleanUnitName(raw: string): string {
  const index = raw.search(/Unit/i);
  if (index === -1) {
    return raw.trimStart();
  }
  return raw.slice(index).trimStart();
}

function toAnchorId(name: string): string {
  return name.replace(/\s+/g, '-').replace(/:/g, '');
}

function indexToGroupLabel(index: number): string {
  let label = '';
  let n = index;

  while (n >= 0) {
    label = String.fromCharCode((n % 26) + 65) + label;
    n = Math.floor(n / 26) - 1;
  }

  return label;
}

function toNumber(value: number | string | undefined): number {
  if (typeof value === 'string') {
    return parseFloat(value) || 0;
  }
  if (typeof value === 'number') {
    return value;
  }
  return 0;
}

/* ------------------------------------------------------------------ */
/*                              COMPONENT                             */
/* ------------------------------------------------------------------ */

const UnitPage: React.FC = () => {
  /* Stores unit and video data loaded from CSVs */
  const [units, setUnits] = useState<UnitRow[]>([]);
  const [videos, setVideos] = useState<VideoRow[]>([]);

  /* Fetch units and videos on initial render */
  useEffect(() => {
    useData(DataTypes.Units)
      .then((data) => setUnits((data || []) as UnitRow[]))
      .catch(() => setUnits([]));

    useData(DataTypes.Videos)
      .then((data) => setVideos((data || []) as VideoRow[]))
      .catch(() => setVideos([]));
  }, []);

  /** Strip everything before the first “Unit” (incl. emojis / blanks). */
  const cleanUnitName = (raw: string) => {
    const i = raw.search(/Unit/i); // first occurrence of “Unit”
    return i === -1 ? raw.trimStart() : raw.slice(i).trimStart();
  };

  /** Convert the cleaned name to a safe ID: spaces→dashes, drop colons. */
  const toAnchorId = (name: string) => name.replace(/\s+/g, '-').replace(/:/g, '');

  // Group videos by unit_id and sort by video_order (array methods only)
  const videosByUnit = useMemo(() => {
    type Item = {
      t: string;
      u: string;
      tm: string;
      d: string;
      order: number;
    };

    const grouped: Record<string, Item[]> = {};

    videos.forEach((row) => {
      const unitId = (row.unit_id || '').trim();
      const title = (row.video_title || '').trim();
      const url = (row.video_url || '').trim();

      if (!unitId || !title || !url) {
        return;
      }

      if (!grouped[unitId]) {
        grouped[unitId] = [];
      }

      grouped[unitId].push({
        t: title,
        u: url,
        tm: (row.video_time || '').trim(),
        d: (row.video_desc || '').trim(),
        order: toNumber(row.video_order),
      });
    });

    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => a.order - b.order);
    });

    return grouped;
  }, [videos]);

  // Sort units by 'order' (fallback to name)
  const sortedUnits = useMemo(() => {
    const filtered = units.filter(
      (u) => Boolean(u && u.name && u.name.trim()),
    );

    filtered.sort((a, b) => {
      const ao = toNumber(a.order);
      const bo = toNumber(b.order);

      if (ao !== bo) {
        return ao - bo;
      }

      return (a.name || '').localeCompare(b.name || '');
    });

    return filtered;
  }, [units]);

  // Build dependency group labels
  const dependencyGroupLabels: Record<string, string> = {};

  sortedUnits.forEach((unit, idx) => {
    const groupKey = indexToGroupLabel(idx);
    const displayName = (unit.abbreviated_name || unit.name || '').trim();

    if (!dependencyGroupLabels[groupKey] && displayName) {
      dependencyGroupLabels[groupKey] = displayName;
    }
  });

  return (
    <main className="unit-page">
      <div className="unit-page-content">
        {/* ---------- Side Panel ---------- */}
        <aside className="unit-page-side-items">
          <div className="unit-page-sidebar-sticky">
            <nav className="unit-page-sidebar">
              <span className="unit-page-navbar-title">Units</span>

              {/* Links to each unit section */}
              {sortedUnits.map((unit) => {
                const cleanName = cleanUnitName(unit.name);
                const anchorId = toAnchorId(cleanName);

                return (
                  <div className="unit-page-link" key={index}>
                    <Link smooth to={`#${anchorId}`}>{cleanName}</Link>
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ---------- Main Content ---------- */}
        <section className="unit-page-cards">
          {sortedUnits.map((unit) => {
            const cleanName = cleanUnitName(unit.name);
            const anchorId = toAnchorId(cleanName);
            const unitId = (unit.unit_id || '').trim();
            const list = videosByUnit[unitId] || [];
            const topicKey = indexToGroupLabel(index);

            return (
              <div key={index}>
                {/* anchor that matches the sidebar link */}
                <div id={anchorId} className="unit-page-anchor" aria-hidden="true" />

                <UnitCard
                  unitId={unit.unit_id}
                  name={unit.name}
                  description={unit.description}
                  note={unit.note || ''}
                  videos={list.map((video) => ({
                    t: video.t,
                    u: video.u,
                    tm: video.tm,
                    d: video.d,
                  }))}
                  topicKey={topicKey}
                  groupLabels={dependencyGroupLabels}
                />
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
};

export default UnitPage;
