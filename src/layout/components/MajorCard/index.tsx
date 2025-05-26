import React from 'react';
import LinkedArrow from '../../../assets/LinkedArrow.svg';
import './style.scss';

interface MajorCardProps {
  name: string;
  description: string;
  note: string;

  subunit1: string;
  subunit1Video1: string;
  subunit1Video1Url: string;
  subunit1Video2: string;
  subunit1Video2Url: string;
  subunit1Video3: string;
  subunit1Video3Url: string;

  subunit2: string;
  subunit2Video1: string;
  subunit2Video1Url: string;
  subunit2Video2: string;
  subunit2Video2Url: string;
  subunit2Video3: string;
  subunit2Video3Url: string;

  subunit3: string;
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
  subunit1Video1: video1,
  subunit1Video1Url: url1,
  subunit1Video2: video2,
  subunit1Video2Url: url2,
  subunit1Video3: video3,
  subunit1Video3Url: url3,
  subunit2: subunit2Title,
  subunit2Video1: video4,
  subunit2Video1Url: url4,
  subunit2Video2: video5,
  subunit2Video2Url: url5,
  subunit2Video3: video6,
  subunit2Video3Url: url6,
  subunit3: subunit3Title,
  subunit3Video1: video7,
  subunit3Video1Url: url7,
  subunit3Video2: video8,
  subunit3Video2Url: url8,
  subunit3Video3: video9,
  subunit3Video3Url: url9,
}) => {
  // helper to render each subunit if it exists
  const renderSubunit = (title: string, videos: { title: string; url: string }[]) => {
    const filteredVideos = videos.filter((v) => v.title && v.url);
    if (!title || filteredVideos.length === 0) return null;
    return (
      <div className="major-card-videos">
        <p className="major-card-subheading">{title}</p>
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
        <div id={name.replace(/\s/g, '-')} className="major-hyperlink" />
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
          ])}

          {renderSubunit(subunit2Title, [
            { title: video4, url: url4 },
            { title: video5, url: url5 },
            { title: video6, url: url6 },
          ])}

          {renderSubunit(subunit3Title, [
            { title: video7, url: url7 },
            { title: video8, url: url8 },
            { title: video9, url: url9 },
          ])}

          {note && (
            <div className="major-card-note">
              <p className="major-card-note-text">{note}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MajorCard;
