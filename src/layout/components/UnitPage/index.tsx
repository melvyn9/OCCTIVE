// File: src/layout/components/UnitPage/index.tsx
import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import 'react-dropdown/style.css';

import UnitCard from '../UnitCard';
import { useData, DataTypes, Videos } from '../../../utils/data';

import './style.scss';

const UnitPage: React.FC = () => {
  const [videoData, setVideoData] = useState<Videos[]>([]);

  useEffect(() => {
    useData(DataTypes.Videos)
      .then((data) => setVideoData(data as Videos[]))
      .catch(() => setVideoData([]));
  }, []);

  /** Strip everything before the first “Unit” (incl. emojis / blanks). */
  const cleanUnitName = (raw: string) => {
    const i = raw.search(/Unit/i); // first occurrence of “Unit”
    return i === -1 ? raw.trimStart() : raw.slice(i).trimStart();
  };

  /** Convert the cleaned name to a safe ID: spaces→dashes, drop colons. */
  const toAnchorId = (name: string) => name.replace(/\s+/g, '-').replace(/:/g, '');

  return (
    <div className="unit-page">
      <div className="unit-page-content">
        {/* ---------- Side Panel ---------- */}
        <div className="unit-page-side-items">
          <div className="unit-page-sidebar-sticky">
            <div className="unit-page-sidebar">
              <span className="unit-page-navbar-title">💻 OCCTIVE Library</span>

              {videoData.map((unit, index) => {
                const cleanName = cleanUnitName(unit.name);
                const anchorId = toAnchorId(cleanName);

                return (
                  <div className="unit-page-link" key={index}>
                    <Link smooth to={`#${anchorId}`}>{cleanName}</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ---------- Main Content ---------- */}
        <div className="unit-page-cards">
          {videoData.map((unit, index) => {
            const cleanName = cleanUnitName(unit.name);
            const anchorId = toAnchorId(cleanName);

            return (
              <div key={index}>
                {/* anchor that matches the sidebar link */}
                <div id={anchorId} className="unit-page-anchor" aria-hidden="true" />

                <UnitCard
                  name={unit.name}
                  description={unit.description}
                  note={unit.note || ''}
                  /* ---------- Sub-unit 1 ---------- */
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
                  /* ---------- Sub-unit 2 ---------- */
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
                  /* ---------- Sub-unit 3 ---------- */
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UnitPage;
