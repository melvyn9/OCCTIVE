/* eslint-disable react/destructuring-assignment, max-len,
   object-curly-newline, react/jsx-max-props-per-line,
   implicit-arrow-linebreak */
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
}

/* ------------------------------------------------------------------ */
/*                              COMPONENT                             */
/* ------------------------------------------------------------------ */

const UnitCard: React.FC<UnitCardProps> = (props) => {
  /* helper: YouTube URL → embed */
  const toEmbed = (url: string) => {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&\n]+)/);
    return m ? `https://www.youtube.com/embed/${m[1]}` : url;
  };

  /* per-video component so each row owns its own showGraph */
  type V = { t: string; u: string; tm: string; d: string };
  const VideoRow: React.FC<{ video: V; idx: number; baseId: string }> = ({ video, idx, baseId }) => {
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
            <DependencyGraph flowId={`${baseId}-v${idx}`} highlightId={video.t} />
          </div>
        )}
      </>
    );
  };

  /* baseId ensures unique graph ids inside this card */
  const baseId = `graph-${props.name.replace(/\s+/g, '-')}`;

  // Build one flat list of videos (no sub-units), keep only non-empty
  const nonEmpty = (props.videos || []).filter((v) => v.t && v.u);

  return (
    <>
      <div className="frame-card">
        <div className="frame-card-unit">
          <p className="frame-card-heading">{props.name}</p>
          <p className="frame-card-description">{props.description}</p>
        </div>

        {/* videos */}
        <div className="frame-card-video-block">
          {nonEmpty.map((v, i) => (
            <VideoRow key={`${v.u}-${i}`} video={v} idx={i} baseId={baseId} />
          ))}
        </div>

        {props.note && (
          <div className="frame-card-note">
            <p className="frame-card-note-text">{props.note}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UnitCard;
