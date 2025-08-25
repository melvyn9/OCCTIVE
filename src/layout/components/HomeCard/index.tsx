// File: src/layout/components/HomeCard/index.tsx
import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import CopyIcon from '../../../assets/CopyIcon.svg';
import './style.scss';

interface HomeCardProps {
  name: string;
  description: string;
  note: string;

  subunit1: string;
  subunit1Copy: string;
  subunit1Video1: string;
  subunit1Video1Url: string;
  subunit1Video2: string;
  subunit1Video2Url: string;
  subunit1Video3: string;
  subunit1Video3Url: string;

  subunit2: string;
  subunit2Copy: string;
  subunit2Video1: string;
  subunit2Video1Url: string;
  subunit2Video2: string;
  subunit2Video2Url: string;
  subunit2Video3: string;
  subunit2Video3Url: string;

  subunit3: string;
  subunit3Copy: string;
  subunit3Video1: string;
  subunit3Video1Url: string;
  subunit3Video2: string;
  subunit3Video2Url: string;
  subunit3Video3: string;
  subunit3Video3Url: string;

  allVideosCopy: string;
}

/* ───────────────────────── helpers ───────────────────────── */

/** Strip any emoji / blanks that come before “Unit …” */
const cleanUnitName = (raw: string) => {
  const i = raw.search(/Unit/i);
  return i === -1 ? raw.trimStart() : raw.slice(i).trimStart();
};

/** Convert “Unit 1: Setting Context” → “Unit-1-Setting-Context” */
const toAnchorId = (name: string) => name.replace(/\s+/g, '-').replace(/:/g, '');

const HomeCard: React.FC<HomeCardProps> = ({
  name,
  description,
  note,
  allVideosCopy,

  subunit1: subunit1Title,
  subunit1Copy,
  subunit1Video1: video1,
  subunit1Video1Url: url1,
  subunit1Video2: video2,
  subunit1Video2Url: url2,
  subunit1Video3: video3,
  subunit1Video3Url: url3,

  subunit2: subunit2Title,
  subunit2Copy,
  subunit2Video1: video4,
  subunit2Video1Url: url4,
  subunit2Video2: video5,
  subunit2Video2Url: url5,
  subunit2Video3: video6,
  subunit2Video3Url: url6,

  subunit3: subunit3Title,
  subunit3Copy,
  subunit3Video1: video7,
  subunit3Video1Url: url7,
  subunit3Video2: video8,
  subunit3Video2Url: url8,
  subunit3Video3: video9,
  subunit3Video3Url: url9,
}) => {
  /* ─────────────── notification toast ─────────────── */
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500); // disappears after 2.5s
  };

  /* ───────────── copy-all links handler ───────────── */
  const handleCopyAllClick = () => {
    navigator.clipboard
      .writeText(allVideosCopy)
      .then(() => showToast('All links copied!'))
      .catch(() => showToast('Copy failed'));
  };

  /* ───────────── helper to render a subunit ───────────── */
  const renderSubunit = (
    title: string,
    videos: { title: string; url: string }[],
    copyText: string,
  ) => {
    const filteredVideos = videos.filter((v) => v.title && v.url);
    if (!title || filteredVideos.length === 0) return null;

    const handleCopyClick = () => {
      navigator.clipboard
        .writeText(copyText)
        .then(() => showToast('Subheading links copied!'))
        .catch(() => showToast('Copy failed'));
    };

    return (
      <div className="home-card-videos">
        <div className="home-card-subheading-container">
          <span className="home-card-subheading">{title}</span>
          <button
            type="button"
            className="copy-icon-button"
            onClick={handleCopyClick}
            aria-label={`Copy content for ${title}`}
          >
            <img src={CopyIcon} alt="Copy" className="copy-icon" />
          </button>
        </div>

        <div className="home-card-video-list">
          {filteredVideos.map((video) => (
            <div key={video.url} className="home-card-video-item">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="home-card-video-link"
              >
                {video.title}
                <img
                  src={LinkedArrow}
                  alt="Link arrow"
                  className="home-card-link-arrow"
                />
              </a>

              {/* copy icon for this single link */}
              <button
                type="button"
                className="copy-icon-button"
                onClick={() => navigator.clipboard
                  .writeText(video.url)
                  .then(() => showToast('Link copied!'))
                  .catch(() => showToast('Copy failed'))}
                aria-label={`Copy link for ${video.title}`}
              >
                <img src={CopyIcon} alt="Copy link" className="copy-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ───────────────────────── render ───────────────────────── */
  const cleanedName = cleanUnitName(name); // for anchor only
  const anchorId = toAnchorId(cleanedName); // for anchor only
  const displayName = name.trim(); // keeps emoji in heading

  return (
    <>
      <div className="home-card">
        {/* ---------- TOP SECTION ---------- */}
        <div className="home-card-top">
          <div className="home-card-heading-container">
            {/* heading text keeps emoji; link still targets cleaned anchor */}
            <Link
              smooth
              to={`/units#${anchorId}`}
              className="home-card-heading home-card-heading-link"
            >
              {displayName}
            </Link>

            <button
              type="button"
              className="copy-icon-button"
              onClick={handleCopyAllClick}
              aria-label={`Copy all links for ${name}`}
            >
              <img src={CopyIcon} alt="Copy all" className="copy-icon" />
            </button>
          </div>
        </div>

        {/* ---------- BOTTOM SECTION ---------- */}
        <div className="home-card-bottom">
          <div className="home-card-inner">
            <div className="home-card-info-group">
              <p className="home-card-subheading">Description</p>
              <p className="home-card-description">{description}</p>
            </div>

            {renderSubunit(
              subunit1Title,
              [
                { title: video1, url: url1 },
                { title: video2, url: url2 },
                { title: video3, url: url3 },
              ],
              subunit1Copy,
            )}

            {renderSubunit(
              subunit2Title,
              [
                { title: video4, url: url4 },
                { title: video5, url: url5 },
                { title: video6, url: url6 },
              ],
              subunit2Copy,
            )}

            {renderSubunit(
              subunit3Title,
              [
                { title: video7, url: url7 },
                { title: video8, url: url8 },
                { title: video9, url: url9 },
              ],
              subunit3Copy,
            )}

            {note && (
              <div className="home-card-note">
                <p className="home-card-note-text">{note}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* toast */}
      {toast && <div className="copy-toast">{toast}</div>}
    </>
  );
};

export default HomeCard;
