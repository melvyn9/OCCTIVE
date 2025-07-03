import React, { useState } from 'react';
import CopyIconWhite from '../../../assets/CopyIconWhite.svg';
import './style.scss';

/* ------------------------------------------------------------------ */
/*                             PROP TYPES                             */
/* ------------------------------------------------------------------ */

export interface FrameCardProps {
  name: string;
  description: string;
  note: string;

  /* ---------- Sub-unit 1 ---------- */
  subunit1: string;
  subunit1Copy: string;
  subunit1Video1: string;
  subunit1Video1Url: string;
  subunit1Video1Time: string;
  subunit1Video1Desc: string;
  subunit1Video2: string;
  subunit1Video2Url: string;
  subunit1Video2Time: string;
  subunit1Video2Desc: string;
  subunit1Video3: string;
  subunit1Video3Url: string;
  subunit1Video3Time: string;
  subunit1Video3Desc: string;

  /* ---------- Sub-unit 2 ---------- */
  subunit2: string;
  subunit2Copy: string;
  subunit2Video1: string;
  subunit2Video1Url: string;
  subunit2Video1Time: string;
  subunit2Video1Desc: string;
  subunit2Video2: string;
  subunit2Video2Url: string;
  subunit2Video2Time: string;
  subunit2Video2Desc: string;
  subunit2Video3: string;
  subunit2Video3Url: string;
  subunit2Video3Time: string;
  subunit2Video3Desc: string;

  /* ---------- Sub-unit 3 ---------- */
  subunit3: string;
  subunit3Copy: string;
  subunit3Video1: string;
  subunit3Video1Url: string;
  subunit3Video1Time: string;
  subunit3Video1Desc: string;
  subunit3Video2: string;
  subunit3Video2Url: string;
  subunit3Video2Time: string;
  subunit3Video2Desc: string;
  subunit3Video3: string;
  subunit3Video3Url: string;
  subunit3Video3Time: string;
  subunit3Video3Desc: string;
}

/* ------------------------------------------------------------------ */
/*                              COMPONENT                             */
/* ------------------------------------------------------------------ */

const FrameCard: React.FC<FrameCardProps> = ({
  name,
  description,
  note,

  /* ---------- Sub-unit 1 ---------- */
  subunit1: subunit1Title,
  subunit1Copy,
  subunit1Video1: video1,
  subunit1Video1Url: url1,
  subunit1Video1Time: time1,
  subunit1Video1Desc: desc1,
  subunit1Video2: video2,
  subunit1Video2Url: url2,
  subunit1Video2Time: time2,
  subunit1Video2Desc: desc2,
  subunit1Video3: video3,
  subunit1Video3Url: url3,
  subunit1Video3Time: time3,
  subunit1Video3Desc: desc3,

  /* ---------- Sub-unit 2 ---------- */
  subunit2: subunit2Title,
  subunit2Copy,
  subunit2Video1: video4,
  subunit2Video1Url: url4,
  subunit2Video1Time: time4,
  subunit2Video1Desc: desc4,
  subunit2Video2: video5,
  subunit2Video2Url: url5,
  subunit2Video2Time: time5,
  subunit2Video2Desc: desc5,
  subunit2Video3: video6,
  subunit2Video3Url: url6,
  subunit2Video3Time: time6,
  subunit2Video3Desc: desc6,

  /* ---------- Sub-unit 3 ---------- */
  subunit3: subunit3Title,
  subunit3Copy,
  subunit3Video1: video7,
  subunit3Video1Url: url7,
  subunit3Video1Time: time7,
  subunit3Video1Desc: desc7,
  subunit3Video2: video8,
  subunit3Video2Url: url8,
  subunit3Video2Time: time8,
  subunit3Video2Desc: desc8,
  subunit3Video3: video9,
  subunit3Video3Url: url9,
  subunit3Video3Time: time9,
  subunit3Video3Desc: desc9,
}) => {
  /* ------------------------- Toast logic ------------------------- */
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  /* -------------------------- Helpers ---------------------------- */
  const getEmbedUrl = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const renderSubunit = (
    title: string,
    videos: { title: string; time: string; desc: string; url: string }[],
    copyText: string,
  ) => {
    const filteredVideos = videos.filter((v) => v.title && v.url);
    if (!title || filteredVideos.length === 0) return null;

    const handleCopyClick = () => {
      navigator.clipboard
        .writeText(copyText)
        .then(() => showToast('Copied to clipboard!'))
        .catch((err) => console.error('Copy failed:', err));
    };

    return (
      <div className="frame-card-subunit">
        <div className="frame-card-subheading-container">
          <span className="frame-card-subheading">{title}</span>

          {copyText && (
            <button
              type="button"
              className="copy-icon-button"
              onClick={handleCopyClick}
              aria-label={`Copy content for ${title}`}
            >
              <img src={CopyIconWhite} alt="Copy" className="copy-icon" />
            </button>
          )}
        </div>

        { /* <p className="frame-card-resources">Resources</p> */ }
        { /* <p className="frame-card-practice-questions">Practice Questions</p> */ }

        <div className="frame-card-video-cards">
          {filteredVideos.map((video, index) => (
            <div key={index} className="frame-card-video-card">
              <div className="video-card-container">
                <div className="video-frame-container">
                  <iframe
                    width="100%"
                    height="250"
                    src={getEmbedUrl(video.url)}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="video-card-info">
                  <p className="frame-card-video-title">{video.title}</p>
                  <p className="frame-card-time">{video.time}</p>
                  <p className="frame-card-desc">{video.desc}</p>

                  <a
                    href="https://docs.google.com/drawings/d/1lD1CxMXV6G_83KfyaABuvqY-g2SodAKmKiVu3FFWMo8/edit"
                    className="btn-lightblue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/img/dependency_icon.png"
                      alt="Dependencies Icon"
                      className="dependency-icon"
                    />
                    Dependencies
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* --------------------------- JSX ------------------------------- */
  return (
    <>
      <div className="frame-card">
        {/* --------- Unit heading + overview --------- */}
        <div className="frame-card-unit">
          <p className="frame-card-heading">{name}</p>
          <p className="frame-card-description">{description}</p>
        </div>

        {/* --------- Sub-units --------- */}
        {/* Sub-unit 1 */}
        {renderSubunit(
          subunit1Title,
          [
            {
              title: video1, time: time1, desc: desc1, url: url1,
            },
            {
              title: video2, time: time2, desc: desc2, url: url2,
            },
            {
              title: video3, time: time3, desc: desc3, url: url3,
            },
          ],
          subunit1Copy,
        )}

        {/* Sub-unit 2 */}
        {renderSubunit(
          subunit2Title,
          [
            {
              title: video4, time: time4, desc: desc4, url: url4,
            },
            {
              title: video5, time: time5, desc: desc5, url: url5,
            },
            {
              title: video6, time: time6, desc: desc6, url: url6,
            },
          ],
          subunit2Copy,
        )}

        {/* Sub-unit 3 */}
        {renderSubunit(
          subunit3Title,
          [
            {
              title: video7, time: time7, desc: desc7, url: url7,
            },
            {
              title: video8, time: time8, desc: desc8, url: url8,
            },
            {
              title: video9, time: time9, desc: desc9, url: url9,
            },
          ],
          subunit3Copy,
        )}

        {/* Optional note */}
        {note && (
          <div className="frame-card-note">
            <p className="frame-card-note-text">{note}</p>
          </div>
        )}
      </div>
      {/* Toast */}
      {toast && <div className="copy-toast">{toast}</div>}
    </>
  );
};

export default FrameCard;
