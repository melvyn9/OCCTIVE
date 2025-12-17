// File: src/layout/components/UnitCard/index.tsx
// Renders a semantic, accessible unit card with embedded videos and dependency graphs.

import React, { useState } from 'react';
import DependencyChartBtnIcon from '../../../assets/dependency_chart_btn_icon.svg';
import DependencyGraph from '../DependencyGraph';
import './style.scss';

/* ------------------------------------------------------------------ */
/*                             PROP TYPES                             */
/* ------------------------------------------------------------------ */

export interface UnitCardProps {
  unitId: string;
  name: string;
  description: string;
  note: string;
  // Flat list of videos (no sub-units)
  videos: Array<{ t: string; u: string; tm: string; d: string }>;
  // Mapping from topic key to abbreviated display name
  groupLabels?: Record<string, string>;
  topicColorMap: Record<string, string>;
}

/* ------------------------------------------------------------------ */
/*                              COMPONENT                             */
/* ------------------------------------------------------------------ */

const UnitCard: React.FC<UnitCardProps> = ({
  unitId,
  name,
  description,
  note,
  videos,
  groupLabels,
  topicColorMap,
}) => {
  /* Converts a YouTube watch URL into an embeddable iframe URL */
  const toEmbed = (url: string) => {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n]+)/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : url;
  };

  /* Per-video row component so each video controls its own graph state */
  type V = { t: string; u: string; tm: string; d: string };
  const VideoRow: React.FC<{
    video: V;
    idx: number;
    baseId: string;
  }> = ({ video, idx, baseId }) => {
    /* Controls visibility of the dependency graph for this video */
    const [open, setOpen] = useState(false);
    return (
      <>
        <li className="video-entry-card">
          <div className="video-entry-left">
            <iframe
              src={toEmbed(video.u)}
              title={`video-${idx}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Right side contains video metadata and actions */}
          <section className="video-entry-right">
            <p className="frame-card-video-title">{video.t}</p>
            <p className="frame-card-time">{video.tm}</p>
            <p className="frame-card-desc">{video.d}</p>

            {/* Button toggles the dependency graph for this video */}
            <button
              type="button"
              className="btn-lightblue btn-dependencies"
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
            >
              <img src={DependencyChartBtnIcon} alt="" className="dependency-icon" />
              {open ? 'Hide Dependencies' : 'Dependencies'}
            </button>
          </section>
        </li>

        {/* Dependency graph modal is rendered conditionally per video */}
        {open && (
          <div className="video-entry-graph-wrapper">
            <DependencyGraph
              isOpen={open}
              onClose={() => setOpen(false)}
              flowId={`${baseId}-v${idx}`}
              highlightId={video.t}
              groupLabels={groupLabels}
              topicColorMap={topicColorMap}
            />
          </div>
        )}
      </>
    );
  };

  /* Base id guarantees unique dependency graph ids within this unit */
  const baseId = `graph-${name.replace(/\s+/g, '-')}`;

  /* Filter out incomplete video rows before rendering */
  const nonEmpty = (videos || []).filter((v) => v.t && v.u);

  // Determine the deterministic topic color for this unit
  const topicColor = topicColorMap[unitId];
  return (
    <>
      {/* Heading of the unit card */}
      <article className="frame-card">
        <header className="frame-card-unit">
          <p
            className="frame-card-heading"
            style={{ color: topicColor }}
          >
            {name}
          </p>
          <p className="frame-card-description">{description}</p>
        </header>

        {/* Section contains the full list of videos for this unit */}
        <section className="frame-card-video-block">
          <ul className="frame-card-video-list">
            {nonEmpty.map((v, i) => (
              <VideoRow
                key={`${v.u}-${i}`}
                video={v}
                idx={i}
                baseId={baseId}
              />
            ))}
          </ul>
        </section>

        {/* Optional note at the bottom of the unit card */}
        {note && (
          <aside className="frame-card-note">
            <p className="frame-card-note-text">{note}</p>
          </aside>
        )}
      </article>
    </>
  );
};

export default UnitCard;
