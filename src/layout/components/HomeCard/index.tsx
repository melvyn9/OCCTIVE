// File: src/layout/components/HomeCard/index.tsx
// Renders a unit card on the Home page with consistent topic-based coloring.

import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import CopyIcon from '../../../assets/CopyIcon.svg';
import './style.scss';

/* Video metadata rendered inside the card */
interface VideoItem {
  title: string;
  url: string;
  time?: string;
  desc?: string;
}

/* Props for a single Home unit card */
interface HomeCardProps {
  name: string;
  description: string;
  note?: string;
  videos: VideoItem[];
  allVideosCopy: string;
  topicColor: string;
}

/* ───────────────────────── helpers ───────────────────────── */

/* Removes leading emoji/whitespace before "Unit …" for stable anchors */
const cleanUnitName = (raw: string) => {
  const i = raw.search(/Unit/i);
  return i === -1 ? raw.trimStart() : raw.slice(i).trimStart();
};

/* Converts unit name into a hash-safe anchor id */
const toAnchorId = (name: string) => name.replace(/\s+/g, '-').replace(/:/g, '');
const HomeCard: React.FC<HomeCardProps> = ({
  name,
  description,
  note,
  videos,
  allVideosCopy,
  topicColor,
}) => {
  /* Toast state for copy feedback */
  const [toast, setToast] = useState<string | null>(null);

  /* Displays a temporary status message */
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  /* Copies all video links for the unit */
  const handleCopyAllClick = () => {
    navigator.clipboard
      .writeText(allVideosCopy || '')
      .then(() => showToast('All links copied!'))
      .catch(() => showToast('Copy failed'));
  };

  /* Precompute values */
  const cleanedName = cleanUnitName(name);
  const anchorId = toAnchorId(cleanedName);
  const displayName = name.trim();

  /* Renders the list of videos for this unit */
  const renderVideos = (items: VideoItem[]) => {
    const filtered = (items || []).filter((v) => v.title && v.url);
    if (filtered.length === 0) return null;

    return (
      <section
        className="home-card-videos"
        aria-labelledby={`${anchorId}-videos`}
      >
        <ul className="home-card-video-list">
          {filtered.map((video) => (
            <li key={video.url} className="home-card-video-item">
              {/* External video link with visual and textual affordances */}
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="home-card-video-link"
              >
                {video.title}
                <img
                  src={LinkedArrow}
                  alt="External link"
                  className="home-card-link-arrow"
                />
              </a>

              {/* Copy button scoped to a single video link */}
              <button
                type="button"
                className="copy-icon-button"
                onClick={() => {
                  navigator.clipboard
                    .writeText(video.url)
                    .then(() => showToast('Link copied!'))
                    .catch(() => showToast('Copy failed'));
                }}
                aria-label={`Copy link for ${video.title}`}
              >
                <img src={CopyIcon} alt="" className="copy-icon" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    );
  };

  /* ───────────────────────── render ───────────────────────── */
  return (
    <>
      <article className="home-card">
        {/* ---------- Header ---------- */}
        <header className="home-card-top">
          <div className="home-card-heading-container">
            {/* Title links to Library anchor with consistent topic color */}
            <Link
              smooth
              to={`/library#${anchorId}`}
              className="home-card-heading home-card-heading-link"
              style={{ color: topicColor }}
            >
              {displayName}
            </Link>

            {/* Copy-all button */}
            <button
              type="button"
              className="copy-icon-button"
              onClick={handleCopyAllClick}
              aria-label={`Copy all links for ${name}`}
              title="Copy all links"
            >
              <img src={CopyIcon} alt="Copy all" className="copy-icon" />
            </button>
          </div>
        </header>

        {/* ---------- Content ---------- */}
        <section className="home-card-bottom">
          <div className="home-card-inner">
            {/* Description */}
            {description && (
              <section className="home-card-info-group">
                <p className="home-card-subheading">Description</p>
                <p className="home-card-description">{description}</p>
              </section>
            )}

            {/* Videos */}
            {renderVideos(videos)}

            {/* Optional note */}
            {note && (
              <aside className="home-card-note">
                <p className="home-card-note-text">{note}</p>
              </aside>
            )}
          </div>
        </section>
      </article>

      {/* Toast feedback */}
      {toast && <div className="copy-toast">{toast}</div>}
    </>
  );
};

export default HomeCard;
