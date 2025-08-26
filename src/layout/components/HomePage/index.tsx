// File: src/layout/components/HomePage/index.tsx
import React, { useEffect, useState } from 'react';

import HomeCard from '../HomeCard';
import { useData, DataTypes, Videos } from '../../../utils/data';

import './style.scss';
import DependencyGraph from '../DependencyGraph';

const HomePage: React.FC = () => {
  /* ---------- OCCTIVE video data ---------- */
  const [videoData, setVideoData] = useState<Videos[]>([]);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    useData(DataTypes.Videos)
      .then((d) => setVideoData(d as Videos[]))
      .catch(() => setVideoData([]));
  }, []);

  /* ---------- render ---------- */
  return (
    <main className="home-page">
      {/* OCCTIVE hero */}
      <section className="home-page-hero">
        <div className="home-page-hero-content">
          <div className="home-page-hero-text">
            {/* Remove Later */}
            <div className="home-page-notice" role="note" aria-label="site notice">
              <p className="home-page-notice-text">
                This is a new page under development. For the currently active site, please see:{' '}
                <a
                  className="home-page-notice-link"
                  href="https://occtive.github.io/www/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://occtive.github.io/www/index.html
                </a>
              </p>
            </div>
            {/* Remove Later */}
            <h1 className="home-page-title">Welcome to the OCCTIVE Library</h1>
            <p className="home-page-text">
              An accessible intro to computer science, covering programming basics,
              problem-solving, and real-world applications in Python and R.
            </p>
            <div className="home-page-hero-buttons">
              <button
                type="button"
                className="btn-orange"
                onClick={() => setShowGraph((v) => !v)}
              >
                {showGraph ? 'Hide Dependency Graph' : 'Show Dependency Graph'}
              </button>
              {/* <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdy5MtrwNQZ9VHM32Tjm6UL3MTuc9vu-oQ9vknjkVrviUYC0g/viewform"
                className="btn-blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                Provide Feedback
              </a> */}
            </div>
          </div>
        </div>
      </section>

      {showGraph && <DependencyGraph />}

      {/* video cards */}
      <section className="home-page-content">
        <div className="home-page-cards">
          {videoData.map((unit) => (
            <HomeCard
              key={unit.name}
              name={unit.name}
              description={unit.description}
              note={unit.note || ''}
              allVideosCopy={unit['all videos copy']}
              subunit1={unit['subunit 1']}
              subunit1Copy={unit['subunit 1 copy']}
              subunit1Video1={unit['subunit 1 video 1']}
              subunit1Video1Url={unit['subunit 1 video 1 url']}
              subunit1Video2={unit['subunit 1 video 2']}
              subunit1Video2Url={unit['subunit 1 video 2 url']}
              subunit1Video3={unit['subunit 1 video 3']}
              subunit1Video3Url={unit['subunit 1 video 3 url']}
              subunit2={unit['subunit 2']}
              subunit2Copy={unit['subunit 2 copy']}
              subunit2Video1={unit['subunit 2 video 1']}
              subunit2Video1Url={unit['subunit 2 video 1 url']}
              subunit2Video2={unit['subunit 2 video 2']}
              subunit2Video2Url={unit['subunit 2 video 2 url']}
              subunit2Video3={unit['subunit 2 video 3']}
              subunit2Video3Url={unit['subunit 2 video 3 url']}
              subunit3={unit['subunit 3']}
              subunit3Copy={unit['subunit 3 copy']}
              subunit3Video1={unit['subunit 3 video 1']}
              subunit3Video1Url={unit['subunit 3 video 1 url']}
              subunit3Video2={unit['subunit 3 video 2']}
              subunit3Video2Url={unit['subunit 3 video 2 url']}
              subunit3Video3={unit['subunit 3 video 3']}
              subunit3Video3Url={unit['subunit 3 video 3 url']}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;
