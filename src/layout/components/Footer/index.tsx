// File: Footer/index.tsx
// This file defines the Footer component, which is displayed at the bottom
// of each page on the "Computing Paths" website.
// The footer includes the UCSD logo, contact information, navigation links
// to different pages, and a link to report issues.import React from 'react'

import React from 'react';
import './style.scss';

// The Footer component is a functional component that renders the website's footer.
// It includes a logo, contact email, navigation links, and a form link for reporting issues.
const Footer: React.FC = () => (
  <div className="footer">
    <div className="footer-content">
      <img className="footer-logo" src={`${process.env.PUBLIC_URL}/img/occtive_logo.png`} alt="OCCTIVE Logo" />
      <p className="footer-contact">Contact</p>
      <a href="mailto:occtive@gmail.com"><p className="footer-email">occtive@gmail.com</p></a>
    </div>
    <div className="footer-issue">
      <p className="footer-issue-heading">Have an issue?</p>
      <a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/forms/d/e/1FAIpQLSeg0R3tgG7Wdv1g4jPJSk34dweuWTdZg1hTUHLghnmD5bB7dQ/viewform"><p className="footer-issue-link">Fill out this form</p></a>
    </div>
  </div>
);

export default Footer;
