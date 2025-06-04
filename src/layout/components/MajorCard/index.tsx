import React, { useState } from 'react';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import CopyIcon from '../../../assets/CopyIcon.svg';
import './style.scss';

interface MajorCardProps {
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
}

const MajorCard: React.FC<MajorCardProps> = ({
  name,
  description,
  note,

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
  // Notification
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500); // disappears after 2.5s
  };

  // helper to render each subunit if it exists
  const renderSubunit = (
    title: string,
    videos: { title: string; url: string }[],
    copyText: string,
  ) => {
    const filteredVideos = videos.filter((v) => v.title && v.url);
    if (!title || filteredVideos.length === 0) return null;

    const handleCopyClick = () => {
      navigator.clipboard.writeText(copyText)
        .then(() => showToast('Copied to clipboard!'))
        .catch((err) => console.error('Copy failed:', err));
    };

    const firstVideoUrl = filteredVideos[0]?.url || '#';

    return (
      <div className="major-card-videos">
        <div className="major-card-subheading-container">
          <a
            href={firstVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="major-card-subheading-link"
          >
            <span className="major-card-subheading">{title}</span>
            <img src={LinkedArrow} alt="Link Arrow" className="major-card-link-arrow" />
          </a>

          <button
            type="button"
            className="copy-icon-button"
            onClick={handleCopyClick}
            aria-label={`Copy content for ${title}`}
          >
            <img src={CopyIcon} alt="Copy" className="copy-icon" />
          </button>
        </div>

        <div className="major-card-video-list">
          {filteredVideos.map((video, index) => (
            <div key={index} className="major-card-video-item">
              <a href={video.url} target="_blank" rel="noopener noreferrer">
                {video.title}
                <img className="major-card-link-arrow" src={LinkedArrow} alt="Link Arrow" />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="major-card">
        <div className="major-card-top">
          <p className="major-card-heading">{name}</p>
        </div>

        <div className="major-card-bottom">
          <div className="major-card-info">
            <div className="major-card-info-left">
              <p className="major-card-subheading">Description</p>
              <p className="major-card-description">{description}</p>
            </div>
          </div>

          {renderSubunit(subunit1Title, [
            { title: video1, url: url1 },
            { title: video2, url: url2 },
            { title: video3, url: url3 },
          ], subunit1Copy)}

          {renderSubunit(subunit2Title, [
            { title: video4, url: url4 },
            { title: video5, url: url5 },
            { title: video6, url: url6 },
          ], subunit2Copy)}

          {renderSubunit(subunit3Title, [
            { title: video7, url: url7 },
            { title: video8, url: url8 },
            { title: video9, url: url9 },
          ], subunit3Copy)}

          {note && (
            <div className="major-card-note">
              <p className="major-card-note-text">{note}</p>
            </div>
          )}
        </div>
      </div>
      {toast && (
        <div className="copy-toast">
          {toast}
        </div>
      )}
    </>
  );
};

export default MajorCard;
