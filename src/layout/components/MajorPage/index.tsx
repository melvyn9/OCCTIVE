// File: MajorPage/index.tsx
// This component renders the main page for unit-style video cards using the Videos spreadsheet.

import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { HashLink as Link } from 'react-router-hash-link';

import MajorCard from '../MajorCard';
import { useData, DataTypes, Videos } from '../../../utils/data';
import './style.scss';

const MajorPage: React.FC = () => {
  const [videoData, setVideoData] = useState<Array<Videos>>([]);

  useEffect(() => {
    useData(DataTypes.Videos)
      .then((data) => setVideoData(data as Videos[]))
      .catch(() => setVideoData([]));
  }, []);

  return (
    <div className="major-page">
      <h1 className="major-page-title">Welcome to the OCCTIVE Library!</h1>
      <p className="major-page-text">
        {'This course offers an accessible intro to computer science for non-technical backgrounds, '
          + 'covering programming basics, problem-solving, and real-world applications. '
          + 'Students will write simple programs in Python and R, explore how computers process information, '
          + 'and see computing’s impact across industries through hands-on exercises!'}
      </p>

      <div className="major-page-content">
        <h2 className="major-page-subheading">Explore the Units</h2>

        <div className="major-page-scroll-content">
          {/* Sidebar links */}
          <div className="major-page-sidebar">
            {videoData.map((unit, index) => (
              <div className="major-page-link" key={index}>
                <Link smooth to={`/majors#${unit.name.replace(/\s/g, '-')}`}>{unit.name}</Link>
              </div>
            ))}
          </div>

          {/* Dropdown for mobile navigation */}
          <div className="major-page-mobile-navigation">
            <Dropdown
              className="dropdown-root"
              controlClassName="dropdown-control"
              arrowClassName="dropdown-arrow"
              options={videoData.map((unit) => unit.name)}
              placeholder="Select a unit"
              onChange={(unit) => {
                location.hash = `#${unit.value.replace(/\s/g, '-')}`;
              }}
            />
          </div>

          {/* Render each unit as a card */}
          <div className="major-page-cards">
            {videoData.map((unit, index) => (
              <MajorCard
                key={index}
                name={unit.name}
                description={unit.description}
                note={unit.note || ''}
                subunit1={unit['subunit 1']}
                subunit1Video1={unit['subunit 1 video 1']}
                subunit1Video1Url={unit['subunit 1 video 1 url']}
                subunit1Video2={unit['subunit 1 video 2']}
                subunit1Video2Url={unit['subunit 1 video 2 url']}
                subunit1Video3={unit['subunit 1 video 3']}
                subunit1Video3Url={unit['subunit 1 video 3 url']}
                subunit2={unit['subunit 2']}
                subunit2Video1={unit['subunit 2 video 1']}
                subunit2Video1Url={unit['subunit 2 video 1 url']}
                subunit2Video2={unit['subunit 2 video 2']}
                subunit2Video2Url={unit['subunit 2 video 2 url']}
                subunit2Video3={unit['subunit 2 video 3']}
                subunit2Video3Url={unit['subunit 2 video 3 url']}
                subunit3={unit['subunit 3']}
                subunit3Video1={unit['subunit 3 video 1']}
                subunit3Video1Url={unit['subunit 3 video 1 url']}
                subunit3Video2={unit['subunit 3 video 2']}
                subunit3Video2Url={unit['subunit 3 video 2 url']}
                subunit3Video3={unit['subunit 3 video 3']}
                subunit3Video3Url={unit['subunit 3 video 3 url']}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorPage;
