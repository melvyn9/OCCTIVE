// File: src/layout/components/UnitPage/index.tsx
// Displays all units with a sidebar for in-page navigation.

import React, { useEffect, useMemo, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
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

const UnitPage: React.FC = () => {
  /* Stores unit and video data loaded from CSVs */
  const [units, setUnits] = useState<UnitRow[]>([]);
  const [videos, setVideos] = useState<VideoRow[]>([]);

  /* Fetch units and videos on initial render */
  useEffect(() => {
    // Units tab
    useData(DataTypes.Units)
      .then((data) => setUnits((data || []) as UnitRow[]))
      .catch(() => setUnits([]));

    // Videos tab (long form)
    useData(DataTypes.Videos)
      .then((data) => setVideos((data || []) as VideoRow[]))
      .catch(() => setVideos([]));
  }, []);

  /** Strip everything before the first “Unit” (incl. emojis / blanks). */
  const cleanUnitName = (raw: string) => {
    const i = raw.search(/Unit/i); // first occurrence of “Unit”
    return i === -1 ? raw.trimStart() : raw.slice(i).trimStart();
  };

  /* Converts a unit name into a hash-safe anchor id */
  const toAnchorId = (name: string) => name.replace(/\s+/g, '-').replace(/:/g, '');

  // Group videos by unit_id and sort by video_order (array methods only)
  const videosByUnit = useMemo(() => {
    const toNum = (v: number | string | undefined) => (typeof v === 'string' ? parseFloat(v) || 0 : v ?? 0);

    type Item = { t: string; u: string; tm: string; d: string; order: number };

    const grouped = (videos || [])
      .filter((row) => {
        const unitId = (row.unit_id || '').trim();
        const t = (row.video_title || '').trim();
        const u = (row.video_url || '').trim();
        return unitId && t && u;
      })
      .map((row) => ({
        unitId: (row.unit_id || '').trim(),
        item: {
          t: (row.video_title || '').trim(),
          u: (row.video_url || '').trim(),
          tm: (row.video_time || '').trim(),
          d: (row.video_desc || '').trim(),
          order: toNum(row.video_order),
        } as Item,
      }))
      .reduce<Record<string, Item[]>>((acc, { unitId, item }) => {
        (acc[unitId] ||= []).push(item);
        return acc;
      }, {});

    Object.keys(grouped).forEach((k) => {
      grouped[k].sort((a, b) => a.order - b.order);
    });

    return grouped;
  }, [videos]);

  /* Sorts units for sidebar and content order */
  const sortedUnits = useMemo(() => {
    const toNum = (v: number | string | undefined) => (typeof v === 'string' ? parseFloat(v) || 0 : v ?? 0);

    return [...units]
      .filter((u) => u && typeof u.name === 'string' && u.name.trim())
      .sort((a, b) => {
        const ao = toNum(a.order);
        const bo = toNum(b.order);
        if (ao !== bo) return ao - bo;
        return (a.name || '').localeCompare(b.name || '');
      });
  }, [units]);

  /* Derives the ordered list of topic colors from the sorted units. */
  const topicColorList = useMemo(
    () => buildTopicColorList(sortedUnits),
    [sortedUnits],
  );

  /* Builds a lookup map from unitId to color for efficient access. */
  const topicColorMap = useMemo(
    () => buildTopicColorMap(topicColorList),
    [topicColorList],
  );

  /* Converts numeric index into spreadsheet-style labels (A, B, …, AA) */
  function indexToGroupLabel(index: number): string {
    let label = '';
    let n = index;

    while (n >= 0) {
      label = String.fromCharCode((n % 26) + 65) + label;
      n = Math.floor(n / 26) - 1;
    }

    return label;
  }

  /* Maps dependency graph group keys to unit display names */
  const dependencyGroupLabels: Record<string, string> = {};

  sortedUnits.forEach((u, idx) => {
    const groupKey = indexToGroupLabel(idx);
    const displayName = (u.abbreviated_name || u.name || '').trim();

    if (groupKey && displayName && !dependencyGroupLabels[groupKey]) {
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

              {sortedUnits.map((unit, index) => {
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
          {sortedUnits.map((unit, index) => {
            const cleanName = cleanUnitName(unit.name);
            const anchorId = toAnchorId(cleanName);
            const list = videosByUnit[(unit.unit_id || '').trim()] || [];

            return (
              <div key={index}>
                {/* anchor that matches the sidebar link */}
                <div id={anchorId} className="unit-page-anchor" aria-hidden="true" />

                <UnitCard
                  unitId={unit.unit_id}
                  name={unit.name}
                  description={unit.description}
                  note={unit.note || ''}
                  videos={list.map(({
                    t, u, tm, d,
                  }) => ({
                    t, u, tm, d,
                  }))}
                  groupLabels={dependencyGroupLabels}
                  topicColorMap={topicColorMap}
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
