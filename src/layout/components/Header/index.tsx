// File: Header/index.tsx
// This file defines the Header component, which is the navigation bar
// for the "Computing Paths" website.
// The header includes a logo, navigation links for desktop and
// mobile views, and an optional hero image.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import HeaderMenu from '../../../assets/HeaderMenu.svg';
import { pages } from '../../../vars';

import './style.scss';

// The Header component is a functional component that renders the website's header.
// It includes a logo, navigation links, a mobile menu toggle, and optionally, a hero image.
const Header: React.FC = () => {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <div className="header">
        <div className="header-content">
          <Link to="/">
            <img className="header-logo" src={`${process.env.PUBLIC_URL}/img/occtive_dark.png`} alt="OCCTIVE Logo" />
          </Link>
          <div className="header-links">
            {pages.map((page, index) => (<Link to={page.link} key={index}><p className="header-link" key={index}>{page.title}</p></Link>))}
          </div>
          <div className="header-mobile">
            <button className="header-mobile-button" type="button" onClick={() => setMenu(!menu)}><img className="header-mobile-icon" src={HeaderMenu} alt="Mobile Menu" /></button>
          </div>
        </div>
        <div className={`header-mobile-links${menu ? ' open' : ''}`}>
          {pages.map((page, index) => (<Link to={page.link} key={index}><p className="header-link">{page.title}</p></Link>))}
        </div>
      </div>
    </>
  );
};

export default Header;
