// File: src/layout/components/HomePage/index.tsx
// Home landing page that renders unit cards and launches the dependency graph modal.

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeCard from '../HomeCard';
import { useData, DataTypes } from '../../../utils/data';
import DependencyGraph from '../DependencyGraph';
import './style.scss';
import { setTopicColorsInOrder } from '../../../utils/topicColors';

/* eslint-disable camelcase */
/* Row shape for Units spreadsheet */
type UnitRow = {
  unit_id: string;
  name: string;
  description: string;
  note?: string;
  order?: number | string;
  'all_videos_copy'?: string;
  abbreviated_name?: string;
};

/* Row shape for Videos spreadsheet */
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
  /* Units + videos data loaded from CSVs */
  const [units, setUnits] = useState<UnitRow[]>([]);
  const [videos, setVideos] = useState<VideoRow[]>([]);

  /* Controls dependency graph modal visibility */
  const [showGraph, setShowGraph] = useState(false);

  /* Fetch unit and video data on initial page load */
  useEffect(() => {
    useData(DataTypes.Units)
      .then((d) => setUnits((d || []) as UnitRow[]))
      .catch(() => setUnits([]));

    useData(DataTypes.Videos)
      .then((d) => setVideos((d || []) as VideoRow[]))
      .catch(() => setVideos([]));
  }, []);

  /* Groups and sorts videos by their associated unit */
  const videosByUnit = useMemo(() => {
    /* Normalizes numeric fields that may arrive as strings */
    const asNumber = (v: number | string | undefined) => {
      if (typeof v === 'string') return parseFloat(v) || 0;
      return v ?? 0;
    };

    // Normalized video object used internally for grouping and sorting videos by unit
    type Item = {
      title: string;
      url: string;
      time?: string;
      desc?: string;
      order: number;
    };

    /* Build and sort video lists per unit */
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
        },
      }))
      .reduce<Record<string, Item[]>>((acc, { unitId, item }) => {
        if (!acc[unitId]) acc[unitId] = [];
        acc[unitId].push(item);
        return acc;
      }, {});

    /* Sort videos within each unit */
    Object.keys(grouped).forEach((k) => {
      grouped[k].sort((a, b) => a.order - b.order);
    });

    return grouped;
  }, [videos]);

  /* Sorts units for display order on the home page */
  const sortedUnits = useMemo(() => {
    const asNumber = (v: number | string | undefined) => {
      if (typeof v === 'string') return parseFloat(v) || 0;
      return v ?? 0;
    };

    /* Primary sort by order, fallback by name */
    return [...units].sort((a, b) => {
      const ao = asNumber(a.order);
      const bo = asNumber(b.order);
      if (ao !== bo) return ao - bo;
      return (a.name || '').localeCompare(b.name || '');
    });
  }, [units]);

  /* Assigns consistent topic colors based on display order */
  useEffect(() => {
    const orderedUnitIds = sortedUnits.map((u) => u.unit_id);
    setTopicColorsInOrder(orderedUnitIds);
  }, [sortedUnits]);

  /* Converts numeric index into spreadsheet-style group labels */
  /* Converts 0 → A, 1 → B, …, 26 → AA, etc. */
  function indexToGroupLabel(index: number): string {
    let label = '';
    let n = index;

    while (n >= 0) {
      label = String.fromCharCode((n % 26) + 65) + label;
      n = Math.floor(n / 26) - 1;
    }

    return label;
  }

  /* Maps dependency graph groups to display names and color keys */
  const dependencyGroupLabels: Record<string, string> = {};
  const dependencyGroupColorKeys: Record<string, string> = {};

  sortedUnits.forEach((u, idx) => {
    const groupKey = indexToGroupLabel(idx); // "A", "B", ...
    const displayName = (u.abbreviated_name || u.name || '').trim();
    const unitId = (u.unit_id || '').trim();

    if (groupKey && displayName && !dependencyGroupLabels[groupKey]) {
      dependencyGroupLabels[groupKey] = displayName;
    }

    if (groupKey && unitId && !dependencyGroupColorKeys[groupKey]) {
      dependencyGroupColorKeys[groupKey] = unitId; // ✅ A -> setting-context
    }
  });

  /* ---------- Render ---------- */
  return (
    <main className="home-page">
      {/* Hero introduces the site purpose and primary actions */}
      <section className="home-page-hero">
        <header className="home-page-hero-content">
          <section className="home-page-hero-text">
            <h1 className="home-page-title">
              Discover Computer Science, One Concept at a Time
            </h1>
            <p className="home-page-text">
              A library of computer science videos, covering programming basics,
              problem-solving, and real-world applications.
            </p>

            {/* Primary calls to action for new users */}
            <div className="home-page-hero-buttons">
              <button
                type="button"
                className="btn-primary"
                onClick={() => setShowGraph(true)}
              >
                <b>View Dependencies</b>
              </button>

              <Link to="/about" className="btn-secondary">
                <b>About the Project</b>
              </Link>
            </div>
          </section>

          {/* Decorative illustration supporting the hero content */}
          <figure className="home-page-hero-graphic">
            <img
              src={`${process.env.PUBLIC_URL}/img/header_graphic.png`}
              alt="Illustration of a laptop with code windows and an octopus mascot"
              className="home-page-hero-graphic-img"
            />
          </figure>
        </header>
      </section>

      {/* Dependency graph modal overlays the page when triggered */}
      <DependencyGraph
        isOpen={showGraph}
        onClose={() => setShowGraph(false)}
        groupLabels={dependencyGroupLabels}
        groupColorKeys={dependencyGroupColorKeys}
      />

      {/* Section containing all unit preview cards */}
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
                group={unitId}
              />
            );
          })}
        </div>
      </section>

      {/* Adoption call-to-action for instructors and faculty */}
      <section className="home-page-adoption-card">
        <h2 className="home-page-adoption-title">
          We are currently seeking non-CS faculty who are interested in adopting OCCTIVE
          for their courses.
        </h2>
        <p className="home-page-adoption-text">
          Click below for more information about the project in general or to explore
          OCCTIVE adoption.
        </p>

        {/* External link to adoption interest form */}
        <div className="home-page-adoption-buttons">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScpxuvjaV3tUhRpPG2LDSxJmaam1A_OFaC7wKUDmOigIzveUQ/viewform"
            className="btn-primary"
          >
            <b>Fill Out Our Interest Form</b>
          </a>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
