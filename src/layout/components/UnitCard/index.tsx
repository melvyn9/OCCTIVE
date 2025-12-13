// File: src/layout/components/UnitCard/index.tsx
import React, { useState } from 'react';
import DependencyChartBtnIcon from '../../../assets/dependency_chart_btn_icon.svg';
import DependencyGraph from '../DependencyGraph';
import './style.scss';

/* ------------------------------------------------------------------ */
/*                             PROP TYPES                             */
/* ------------------------------------------------------------------ */

export interface UnitCardProps {
  name: string;
  description: string;
  note: string;
  // Flat list of videos (no sub-units)
  videos: Array<{ t: string; u: string; tm: string; d: string }>;
  // Mapping from topic key to abbreviated display name
  groupLabels?: Record<string, string>;
  groupColorKeys?: Record<string, string>;
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
  groupColorKeys,
}) => {
  /* helper: YouTube URL → embed */
  const toEmbed = (url: string) => {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n]+)/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : url;
  };

  /* per-video component so each row owns its own showGraph */
  type V = { t: string; u: string; tm: string; d: string };
  const VideoRow: React.FC<{
    video: V;
    idx: number;
    baseId: string;
  }> = ({ video, idx, baseId }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <div className="video-entry-card">
          <div className="video-entry-left">
            <iframe
              src={toEmbed(video.u)}
              title={`video-${idx}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="video-entry-right">
            <p className="frame-card-video-title">{video.t}</p>
            <p className="frame-card-time">{video.tm}</p>
            <p className="frame-card-desc">{video.d}</p>

            <button
              type="button"
              className="btn-lightblue btn-dependencies"
              onClick={() => setOpen((s) => !s)}
            >
              <img src={DependencyChartBtnIcon} alt="" className="dependency-icon" />
              {open ? 'Hide Dependencies' : 'Dependencies'}
            </button>
          </div>
        </div>

        {open && (
          <div className="video-entry-graph-wrapper">
            <DependencyGraph
              isOpen={open}
              onClose={() => setOpen(false)}
              flowId={`${baseId}-v${idx}`}
              highlightId={video.t}
              groupLabels={groupLabels}
              groupColorKeys={groupColorKeys}
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

  return (
    <>
      <div className="frame-card">
        <div className="frame-card-unit">
          <p className="frame-card-heading">{name}</p>
          <p className="frame-card-description">{description}</p>
        </div>

        {/* videos */}
        <div className="frame-card-video-block">
          {nonEmpty.map((v, i) => (
            <VideoRow key={`${v.u}-${i}`} video={v} idx={i} baseId={baseId} />
          ))}
        </div>

        {note && (
          <div className="frame-card-note">
            <p className="frame-card-note-text">{note}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UnitCard;
