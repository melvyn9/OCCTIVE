// File: src/layout/components/HomeCard/index.tsx
import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import CopyIcon from '../../../assets/CopyIcon.svg';
import './style.scss';

interface VideoItem {
  title: string;
  url: string;
  time?: string;
  desc?: string;
}

interface HomeCardProps {
  name: string;
  description: string;
  note: string;
  videos: VideoItem[];
  allVideosCopy: string;
  group?: string; // optional, but no longer required
}

/* ───────────────────────── palette + helper ───────────────────────── */

const palette = [
  '#FF69B4', '#F5FF66', '#00AEEF', '#FF8866', '#FFD966', '#7FDBFF', '#32CD32',
  '#8A2BE2', '#20B2AA', '#FF7034', '#4B0082', '#BA55D3', '#6A5ACD', '#DAA520',
  '#48D1CC', '#FF6347', '#4682B4',
];

const colourOf = new Map<string, string>();

function getColorForGroup(key: string): string {
  if (!colourOf.has(key)) {
    const next = colourOf.size % palette.length;
    colourOf.set(key, palette[next]);
  }
  return colourOf.get(key)!;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  note,
  videos,
  allVideosCopy,
  group,
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
      .writeText(allVideosCopy || '')
      .then(() => showToast('All links copied!'))
      .catch(() => showToast('Copy failed'));
  };

  /* ───────────── render videos (single merged list) ───────────── */
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

              {/* copy icon for this single link */}
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
  const cleanedName = cleanUnitName(name); // for anchor only
  const anchorId = toAnchorId(cleanedName); // for anchor only
  const displayName = name.trim(); // keeps emoji in heading

  // Use group if provided, otherwise fall back to cleanedName for consistent coloring
  const borderColor = getColorForGroup(group || cleanedName);

  return (
    <>
      <div
        className="home-card"
        style={{ border: `2px solid ${borderColor}` }}
      >
        {/* ---------- TOP SECTION ---------- */}
        <div className="home-card-top">
          <div className="home-card-heading-container">
            {/* heading text keeps emoji; link still targets cleaned anchor */}
            <Link
              smooth
              to={`/library#${anchorId}`}
              className="home-card-heading home-card-heading-link"
            >
              {displayName}
            </Link>

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

        {/* ---------- BOTTOM SECTION ---------- */}
        <div className="home-card-bottom">
          <div className="home-card-inner">
            {/* ---------- Description ---------- */}
            {description && (
              <div className="home-card-info-group">
                <p className="home-card-subheading">Description</p>
                <p className="home-card-description">{description}</p>
              </div>
            )}

            {/* ---------- Videos ---------- */}
            {renderVideos(videos)}
          </div>
        </div>
      </div>

      {/* toast */}
      {toast && <div className="copy-toast">{toast}</div>}
    </>
  );
};

export default HomeCard;
