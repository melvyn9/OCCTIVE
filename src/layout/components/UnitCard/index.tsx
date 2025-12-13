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
}

/* ------------------------------------------------------------------ */
/*                              COMPONENT                             */
/* ------------------------------------------------------------------ */

const UnitCard: React.FC<UnitCardProps> = ({
  name,
  description,
  note,
  videos,
  groupLabels,
}) => {
  /* helper: YouTube URL → embed */
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
            />
          </div>
        )}
      </>
    );
  };

  /* baseId ensures unique graph ids inside this card */
  const baseId = `graph-${name.replace(/\s+/g, '-')}`;

  // Build one flat list of videos (no sub-units), keep only non-empty
  const nonEmpty = (videos || []).filter((v) => v.t && v.u);

  // Determine the deterministic topic color for this unit
  const topicColor = topicColorMap[unitId];
  return (
    <>
      <article className="frame-card">
        <div className="frame-card-unit">
          <p className="frame-card-heading">{name}</p>
          <p className="frame-card-description">{description}</p>
        </div>

        {/* Section contains the full list of videos for this unit */}
        <section className="frame-card-video-block">
          <ul className="frame-card-video-list">
            {nonEmpty.map((v, i) => (
              <VideoRow
                key={v.u}
                video={v}
                idx={i}
                baseId={baseId}
              />
            ))}
          </ul>
        </section>

        {note && (
          <div className="frame-card-note">
            <p className="frame-card-note-text">{note}</p>
          </div>
        )}
      </article>
    </>
  );
};

export default UnitCard;
