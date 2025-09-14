// File: src/layout/components/UnitPage/index.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import 'react-dropdown/style.css';

import UnitCard from '../UnitCard';
import { useData, DataTypes } from '../../../utils/data';

import './style.scss';

/* eslint-disable camelcase */
type UnitRow = {
  unit_id: string;
  name: string;
  description: string;
  note?: string;
  order?: number | string;
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
  const [units, setUnits] = useState<UnitRow[]>([]);
  const [videos, setVideos] = useState<VideoRow[]>([]);

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

  /** Convert the cleaned name to a safe ID: spaces→dashes, drop colons. */
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

  // Sort units by 'order' (fallback to name)
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

  return (
    <div className="unit-page">
      <div className="unit-page-content">
        {/* ---------- Side Panel ---------- */}
        <div className="unit-page-side-items">
          <div className="unit-page-sidebar-sticky">
            <div className="unit-page-sidebar">
              <span className="unit-page-navbar-title">💻 OCCTIVE Library</span>

              {sortedUnits.map((unit, index) => {
                const cleanName = cleanUnitName(unit.name);
                const anchorId = toAnchorId(cleanName);
                return (
                  <div className="unit-page-link" key={index}>
                    <Link smooth to={`#${anchorId}`}>{cleanName}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------- Main Content ---------- */}
        <div className="unit-page-cards">
          {sortedUnits.map((unit, index) => {
            const cleanName = cleanUnitName(unit.name);
            const anchorId = toAnchorId(cleanName);
            const list = videosByUnit[(unit.unit_id || '').trim()] || [];

            return (
              <div key={index}>
                {/* anchor that matches the sidebar link */}
                <div id={anchorId} className="unit-page-anchor" aria-hidden="true" />

                <UnitCard
                  name={unit.name}
                  description={unit.description}
                  note={unit.note || ''}
                  // Flat list of videos (no sub-units)
                  videos={list.map(({
                    t, u, tm, d,
                  }) => ({
                    t, u, tm, d,
                  }))}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnitPage;
