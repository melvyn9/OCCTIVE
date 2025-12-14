// File: src/layout/components/Footer/index.tsx
// Site-wide footer containing contact info, issue reporting, and grant acknowledgment.

import React from 'react';
import './style.scss';

const Footer: React.FC = () => (
  <footer className="footer">
    <div className="footer-content">
      <img
        className="footer-logo"
        src={`${process.env.PUBLIC_URL}/img/occtive_dark.png`}
        alt="OCCTIVE Logo"
      />
      <p className="footer-contact">Contact</p>
      <a href="mailto:occtive@gmail.com">
        <p className="footer-email">occtive@gmail.com</p>
      </a>
    </div>

    <div className="footer-issue">
      <p className="footer-issue-heading">Have an issue?</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://docs.google.com/forms/d/e/1FAIpQLSdy5MtrwNQZ9VHM32Tjm6UL3MTuc9vu-oQ9vknjkVrviUYC0g/viewform"
      >
        <p className="footer-issue-link">Fill out this form</p>
      </a>
    </div>

    {/* NSF grant acknowledgment with logo */}
    <section className="footer-grant" role="note" aria-label="NSF grant acknowledgment">
      <div className="footer-grant-inner">
        <a
          href="https://www.nsf.gov/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="National Science Foundation"
          className="footer-grant-logo-link"
        >
          <img
            className="footer-grant-logo"
            src={`${process.env.PUBLIC_URL}/img/NSF_logo.png`}
            alt="National Science Foundation logo"
            loading="lazy"
          />
        </a>

        <p className="footer-grant-text">
          Project material based upon work supported by the{' '}
          <a href="https://www.nsf.gov/" target="_blank" rel="noopener noreferrer">
            National Science Foundation
          </a>{' '}
          under Grant Numbers{' '}
          <a
            href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2337251&HistoricalAwards=false"
            target="_blank"
            rel="noopener noreferrer"
          >
            2337251
          </a>
          ,{' '}
          <a
            href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2337252&HistoricalAwards=false"
            target="_blank"
            rel="noopener noreferrer"
          >
            2337252
          </a>
          ,{' '}
          <a
            href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2337253&HistoricalAwards=false"
            target="_blank"
            rel="noopener noreferrer"
          >
            2337253
          </a>
          ,{' '}
          <a
            href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2337254&HistoricalAwards=false"
            target="_blank"
            rel="noopener noreferrer"
          >
            2337254
          </a>
          ,{' '}
          <a
            href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1935113&HistoricalAwards=false"
            target="_blank"
            rel="noopener noreferrer"
          >
            1935113
          </a>
          ,{' '}
          <a
            href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1935099&HistoricalAwards=false"
            target="_blank"
            rel="noopener noreferrer"
          >
            1935099
          </a>
          , and{' '}
          <a
            href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=1935061&HistoricalAwards=false"
            target="_blank"
            rel="noopener noreferrer"
          >
            1935061
          </a>
          . Any opinions, findings, and conclusions or recommendations expressed in this material
          are those of the author(s) and do not necessarily reflect the views of the
          National Science Foundation.
        </p>
      </div>
    </section>
  </footer>
);

export default Footer;
