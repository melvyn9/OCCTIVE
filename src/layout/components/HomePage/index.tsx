// File: src/layout/components/HomePage/index.tsx
import React, { useEffect, useMemo, useState } from 'react';

import HomeCard from '../HomeCard';
import { useData, DataTypes } from '../../../utils/data';

import './style.scss';
import DependencyGraph from '../DependencyGraph';

/* eslint-disable camelcase */
type UnitRow = {
  unit_id: string;
  name: string;
  description: string;
  note?: string;
  order?: number | string;
  'all_videos_copy'?: string;
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

const HomePage: React.FC = () => {
  /* ---------- OCCTIVE video data ---------- */
  const [units, setUnits] = useState<UnitRow[]>([]);
  const [videos, setVideos] = useState<VideoRow[]>([]);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    // fetch Units tab
    useData(DataTypes.Units)
      .then((d) => setUnits((d || []) as UnitRow[]))
      .catch(() => setUnits([]));

    // fetch Videos tab (long form)
    useData(DataTypes.Videos)
      .then((d) => setVideos((d || []) as VideoRow[]))
      .catch(() => setVideos([]));
  }, []);

  // Group videos by unit_id and sort by video_order (no loops; array methods only)
  const videosByUnit = useMemo(() => {
    const asNumber = (v: number | string | undefined) => (typeof v === 'string' ? parseFloat(v) || 0 : v ?? 0);

    type Item = { title: string; url: string; time?: string; desc?: string; order: number };

    const grouped = (videos || [])
      .filter((row) => {
        const unitId = (row.unit_id || '').trim();
        const title = (row.video_title || '').trim();
        const url = (row.video_url || '').trim();
        return unitId && title && url;
      })
      .map((row) => ({
        unitId: (row.unit_id || '').trim(),
        item: {
          title: (row.video_title || '').trim(),
          url: (row.video_url || '').trim(),
          time: row.video_time || '',
          desc: row.video_desc || '',
          order: asNumber(row.video_order),
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
    const asNumber = (v: number | string | undefined) => (typeof v === 'string' ? parseFloat(v) || 0 : v ?? 0);

    return [...units].sort((a, b) => {
      const ao = asNumber(a.order);
      const bo = asNumber(b.order);
      if (ao !== bo) return ao - bo;
      return (a.name || '').localeCompare(b.name || '');
    });
  }, [units]);

  /* ---------- render ---------- */
  return (
    <main className="home-page">
      {/* OCCTIVE hero */}
      <section className="home-page-hero">
        <div className="home-page-hero-content">
          <div className="home-page-hero-text">
            {/* Remove Later */}
            <div className="home-page-notice" role="note" aria-label="site notice">
              <p className="home-page-notice-text">
                This is a new page under development. For the currently active site, please see{' '}
                <a
                  className="home-page-notice-link"
                  href="https://occtive.github.io/www/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://occtive.github.io/www/index.html
                </a>
              </p>
            </div>
            {/* Remove Later */}
            <h1 className="home-page-title">Welcome to the OCCTIVE Library</h1>
            <p className="home-page-text">
              An accessible intro to foundational computing concepts with applications
              in the sciences, humanities, and beyond.
            </p>
            <div className="home-page-hero-buttons">
              <button
                type="button"
                className="btn-orange"
                onClick={() => setShowGraph((v) => !v)}
              >
                {showGraph ? 'Hide Dependency Graph' : 'Show Dependency Graph'}
              </button>
              {/* <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdy5MtrwNQZ9VHM32Tjm6UL3MTuc9vu-oQ9vknjkVrviUYC0g/viewform"
                className="btn-blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                Provide Feedback
              </a> */}
            </div>
          </div>
        </div>
      </section>

      {showGraph && <DependencyGraph />}

      {/* video cards */}
      <section className="home-page-content">
        <div className="home-page-cards">
          {sortedUnits.map((u) => {
            const unitId = (u.unit_id || '').trim();
            const list = videosByUnit[unitId] || [];
            return (
              <HomeCard
                key={unitId || u.name}
                name={u.name}
                description={u.description}
                note={u.note || ''}
                allVideosCopy={u.all_videos_copy || ''}
                videos={list.map(({
                  title, url, time, desc,
                }) => ({
                  title,
                  url,
                  time,
                  desc,
                }))}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
