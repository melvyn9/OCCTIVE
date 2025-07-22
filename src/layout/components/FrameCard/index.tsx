/* eslint-disable react/destructuring-assignment, max-len,
   object-curly-newline, react/jsx-max-props-per-line,
   implicit-arrow-linebreak */
import React, { useState } from 'react';
import CopyIconWhite from '../../../assets/CopyIconWhite.svg';
import DependencyChartBtnIcon from '../../../assets/dependency_chart_btn_icon.svg';
import DependencyGraph from '../DependencyGraph';
import './style.scss';

/* ------------------------------------------------------------------ */
/*                             PROP TYPES                             */
/* ------------------------------------------------------------------ */

export interface FrameCardProps {
  name: string;
  description: string;
  note: string;

  /* ---------- Sub-unit 1 ---------- */
  subunit1: string; subunit1Copy: string;
  subunit1Video1: string; subunit1Video1Url: string; subunit1Video1Time: string; subunit1Video1Desc: string;
  subunit1Video2: string; subunit1Video2Url: string; subunit1Video2Time: string; subunit1Video2Desc: string;
  subunit1Video3: string; subunit1Video3Url: string; subunit1Video3Time: string; subunit1Video3Desc: string;

  /* ---------- Sub-unit 2 ---------- */
  subunit2: string; subunit2Copy: string;
  subunit2Video1: string; subunit2Video1Url: string; subunit2Video1Time: string; subunit2Video1Desc: string;
  subunit2Video2: string; subunit2Video2Url: string; subunit2Video2Time: string; subunit2Video2Desc: string;
  subunit2Video3: string; subunit2Video3Url: string; subunit2Video3Time: string; subunit2Video3Desc: string;

  /* ---------- Sub-unit 3 ---------- */
  subunit3: string; subunit3Copy: string;
  subunit3Video1: string; subunit3Video1Url: string; subunit3Video1Time: string; subunit3Video1Desc: string;
  subunit3Video2: string; subunit3Video2Url: string; subunit3Video2Time: string; subunit3Video2Desc: string;
  subunit3Video3: string; subunit3Video3Url: string; subunit3Video3Time: string; subunit3Video3Desc: string;
}

/* ------------------------------------------------------------------ */
/*                              COMPONENT                             */
/* ------------------------------------------------------------------ */

const FrameCard: React.FC<FrameCardProps> = (props) => {
  /* toast handling */
  const [toast, setToast] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

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

  /* render a sub-unit block with its videos */
  const renderSubunit = (title: string, copyText: string, vids: V[], baseId: string) => {
    const nonEmpty = vids.filter((v) => v.t && v.u);
    if (!title || nonEmpty.length === 0) return null;

    const copyLinks = () =>
      navigator.clipboard.writeText(copyText)
        .then(() => showToast('Copied!'))
        .catch(() => showToast('Copy failed'));

    return (
      <div className="frame-card-subunit">
        <div className="frame-card-subheading-container">
          <span className="frame-card-subheading">{title}</span>
          {copyText && (
            <button type="button" className="copy-icon-button" onClick={copyLinks}>
              <img src={CopyIconWhite} alt="Copy" className="copy-icon" />
            </button>
          )}
        </div>

        {nonEmpty.map((v, i) => (
          <VideoRow key={i} video={v} idx={i} baseId={baseId} />
        ))}
      </div>
    );
  };

  /* baseId ensures unique graph ids inside this card */
  const baseId = `graph-${props.name.replace(/\s+/g, '-')}`;

  return (
    <>
      <div className="frame-card">
        <div className="frame-card-unit">
          <p className="frame-card-heading">{props.name}</p>
          <p className="frame-card-description">{props.description}</p>
        </div>

        {/* sub-unit 1 */}
        {renderSubunit(
          props.subunit1,
          props.subunit1Copy,
          [
            { t: props.subunit1Video1, u: props.subunit1Video1Url, tm: props.subunit1Video1Time, d: props.subunit1Video1Desc },
            { t: props.subunit1Video2, u: props.subunit1Video2Url, tm: props.subunit1Video2Time, d: props.subunit1Video2Desc },
            { t: props.subunit1Video3, u: props.subunit1Video3Url, tm: props.subunit1Video3Time, d: props.subunit1Video3Desc },
          ],
          `${baseId}-s1`,
        )}

        {/* sub-unit 2 */}
        {renderSubunit(
          props.subunit2,
          props.subunit2Copy,
          [
            { t: props.subunit2Video1, u: props.subunit2Video1Url, tm: props.subunit2Video1Time, d: props.subunit2Video1Desc },
            { t: props.subunit2Video2, u: props.subunit2Video2Url, tm: props.subunit2Video2Time, d: props.subunit2Video2Desc },
            { t: props.subunit2Video3, u: props.subunit2Video3Url, tm: props.subunit2Video3Time, d: props.subunit2Video3Desc },
          ],
          `${baseId}-s2`,
        )}

        {/* sub-unit 3 */}
        {renderSubunit(
          props.subunit3,
          props.subunit3Copy,
          [
            { t: props.subunit3Video1, u: props.subunit3Video1Url, tm: props.subunit3Video1Time, d: props.subunit3Video1Desc },
            { t: props.subunit3Video2, u: props.subunit3Video2Url, tm: props.subunit3Video2Time, d: props.subunit3Video2Desc },
            { t: props.subunit3Video3, u: props.subunit3Video3Url, tm: props.subunit3Video3Time, d: props.subunit3Video3Desc },
          ],
          `${baseId}-s3`,
        )}

        {props.note && (
          <div className="frame-card-note">
            <p className="frame-card-note-text">{props.note}</p>
          </div>
        )}
      </div>

      {toast && <div className="copy-toast">{toast}</div>}
    </>
  );
};

export default FrameCard;
