// File: src/layout/components/HomeCard/index.tsx
// Renders a unit card on the Home page with consistent topic-based coloring.

import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import CopyIcon from '../../../assets/CopyIcon.svg';
import './style.scss';
import { getColorForTopic } from '../../../utils/topicColors';

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
  group?: string; // topic/group key used for consistent coloring
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
  group,
}) => {
  /* Toast state for copy feedback */
  const [toast, setToast] = useState<string | null>(null);

  /* Shows a short-lived toast message */
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

  /* Renders the list of videos for this unit */
  const renderVideos = (items: VideoItem[]) => {
    const filtered = (items || []).filter((v) => v.title && v.url);
    if (filtered.length === 0) return null;

    return (
      <div className="home-card-videos">
        <div className="home-card-video-list">
          {filtered.map((video) => (
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

              {/* Copy button for a single video link */}
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
                <img src={CopyIcon} alt="Copy link" className="copy-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ───────────────────────── render ───────────────────────── */

  const cleanedName = cleanUnitName(name); // anchor-only name
  const anchorId = toAnchorId(cleanedName);
  const displayName = name.trim(); // preserves emoji in UI

  /* Resolve topic color via shared topic color registry */
  const headerColor = getColorForTopic(group || cleanedName);

  return (
    <>
      <div className="home-card">
        {/* ---------- Header ---------- */}
        <div className="home-card-top">
          <div className="home-card-heading-container">
            {/* Title links to Library anchor with consistent topic color */}
            <Link
              smooth
              to={`/library#${anchorId}`}
              className="home-card-heading home-card-heading-link"
              style={{ color: headerColor }}
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
        </div>

        {/* ---------- Content ---------- */}
        <div className="home-card-bottom">
          <div className="home-card-inner">
            {/* Description */}
            {description && (
              <div className="home-card-info-group">
                <p className="home-card-subheading">Description</p>
                <p className="home-card-description">{description}</p>
              </div>
            )}

            {/* Videos */}
            {renderVideos(videos)}

            {/* Optional note */}
            {note && (
              <div className="home-card-note">
                <p className="home-card-note-text">{note}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast feedback */}
      {toast && <div className="copy-toast">{toast}</div>}
    </>
  );
};

export default HomeCard;
