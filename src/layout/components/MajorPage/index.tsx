// File: src/layout/components/MajorPage/index.tsx
import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import 'react-dropdown/style.css';

import FrameCard from '../FrameCard'; // ⬅️ NEW CARD
import { useData, DataTypes, Videos } from '../../../utils/data';

import './style.scss';

const MajorPage: React.FC = () => {
  const [videoData, setVideoData] = useState<Videos[]>([]);

  useEffect(() => {
    useData(DataTypes.Videos)
      .then((data) => setVideoData(data as Videos[]))
      .catch(() => setVideoData([]));
  }, []);

  return (
    <div className="major-page">
      <div className="major-page-content">
        {/* ---------- side bar & buttons ---------- */}
        <div className="major-page-side-items">
          <div className="major-page-sidebar">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeg0R3tgG7Wdv1g4jPJSk34dweuWTdZg1hTUHLghnmD5bB7dQ/viewform"
              className="major-page-back-to-main-menu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/img/back-arrow.png"
                alt="Back to Menu Icon"
                className="back-to-main-menu-icon"
              />
              Back to Main Menu
            </a>

            <span className="major-page-navbar-title">💻 OCCTIVE Library</span>

            {videoData.map((unit, index) => (
              <div className="major-page-link" key={index}>
                <Link smooth to={`/majors#${unit.name.replace(/\s/g, '-')}`}>
                  {unit.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="major-page-sidebuttons">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeg0R3tgG7Wdv1g4jPJSk34dweuWTdZg1hTUHLghnmD5bB7dQ/viewform"
              className="btn-blue"
              id="sidebar-btn-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              Additional Resources
            </a>
            <a
              href="https://docs.google.com/drawings/d/1lD1CxMXV6G_83KfyaABuvqY-g2SodAKmKiVu3FFWMo8/edit"
              className="btn-orange"
              id="sidebar-btn-orange"
              target="_blank"
              rel="noopener noreferrer"
            >
              Compact View
            </a>
          </div>

          <div className="major-page-dependency-chart-icon">
            <img
              className="major-page-dependency-chart-image"
              src="img/dependency_graph_temp.png"
              alt="OCCTIVE dependency chart visual"
            />
          </div>
        </div>

        {/* ---------- cards grid ---------- */}
        <div className="major-page-cards">
          {videoData.map((unit, index) => (
            <FrameCard /* ⬅️ use the new card */
              key={index}
              name={unit.name}
              description={unit.description}
              note={unit.note || ''}
              subunit1={unit['subunit 1']}
              subunit1Copy={unit['subunit 1 copy']}
              subunit1Video1={unit['subunit 1 video 1']}
              subunit1Video1Url={unit['subunit 1 video 1 url']}
              subunit1Video1Time={unit['subunit 1 video 1 time']}
              subunit1Video1Desc={unit['subunit 1 video 1 desc']}
              subunit1Video2={unit['subunit 1 video 2']}
              subunit1Video2Url={unit['subunit 1 video 2 url']}
              subunit1Video2Time={unit['subunit 1 video 2 time']}
              subunit1Video2Desc={unit['subunit 1 video 2 desc']}
              subunit1Video3={unit['subunit 1 video 3']}
              subunit1Video3Url={unit['subunit 1 video 3 url']}
              subunit1Video3Time={unit['subunit 1 video 3 time']}
              subunit1Video3Desc={unit['subunit 1 video 3 desc']}
              subunit2={unit['subunit 2']}
              subunit2Copy={unit['subunit 2 copy']}
              subunit2Video1={unit['subunit 2 video 1']}
              subunit2Video1Url={unit['subunit 2 video 1 url']}
              subunit2Video1Time={unit['subunit 2 video 1 time']}
              subunit2Video1Desc={unit['subunit 2 video 1 desc']}
              subunit2Video2={unit['subunit 2 video 2']}
              subunit2Video2Url={unit['subunit 2 video 2 url']}
              subunit2Video2Time={unit['subunit 2 video 2 time']}
              subunit2Video2Desc={unit['subunit 2 video 2 desc']}
              subunit2Video3={unit['subunit 2 video 3']}
              subunit2Video3Url={unit['subunit 2 video 3 url']}
              subunit2Video3Time={unit['subunit 2 video 3 time']}
              subunit2Video3Desc={unit['subunit 2 video 3 desc']}
              subunit3={unit['subunit 3']}
              subunit3Copy={unit['subunit 3 copy']}
              subunit3Video1={unit['subunit 3 video 1']}
              subunit3Video1Url={unit['subunit 3 video 1 url']}
              subunit3Video1Time={unit['subunit 3 video 1 time']}
              subunit3Video1Desc={unit['subunit 3 video 1 desc']}
              subunit3Video2={unit['subunit 3 video 2']}
              subunit3Video2Url={unit['subunit 3 video 2 url']}
              subunit3Video2Time={unit['subunit 3 video 2 time']}
              subunit3Video2Desc={unit['subunit 3 video 2 desc']}
              subunit3Video3={unit['subunit 3 video 3']}
              subunit3Video3Url={unit['subunit 3 video 3 url']}
              subunit3Video3Time={unit['subunit 3 video 3 time']}
              subunit3Video3Desc={unit['subunit 3 video 3 desc']}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MajorPage;
