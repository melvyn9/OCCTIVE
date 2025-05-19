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

}

const MajorCard: React.FC<MajorCardProps> = ({
  name,
  description,
  note,
  subunit1: subunitTitle,
  subunit1Video1: video1,
  subunit1Video1Url: url1,
  subunit1Video2: video2,
  subunit1Video2Url: url2,
  subunit1Video3: video3,
  subunit1Video3Url: url3,
}) => {
  const subunitVideos = [
    { title: video1, url: url1 },
    { title: video2, url: url2 },
    { title: video3, url: url3 },
  ].filter((v) => v.title && v.url);

  return (
    <>
      <div id={name.replace(/\s/g, '-')} className="major-hyperlink" />
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

          {subunitTitle && subunitVideos.length > 0 && (
            <div className="major-card-videos">
              <p className="major-card-subheading">{subunitTitle}</p>
              <div className="major-card-video-list">
                {subunitVideos.map((video, index) => (
                  <div key={index} className="major-card-video-item">
                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                      {video.title}
                      <img className="major-card-link-arrow" src={LinkedArrow} alt="Link Arrow" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

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
