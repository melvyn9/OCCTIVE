// File: Header/index.tsx
// This file defines the Header component, which is the navigation bar
// for the "Computing Paths" website.
// The header includes a logo, navigation links for desktop and
// mobile views, and an optional hero image.

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import HeaderMenu from '../../../assets/HeaderMenu.svg';
import { pages } from '../../../vars';
import './style.scss';

// The Header component is a functional component that renders the website's header.
// It includes a logo, navigation links, a mobile menu toggle, and optionally, a hero image.
const Header: React.FC = () => {
  /* Controls visibility of the mobile navigation menu */
  const [menu, setMenu] = useState(false);

  return (
    <>
      {/* Header landmark identifies site-wide banner */}
      <header className="header">
        <div className="header-content">
          <Link to="/">
            <img className="header-logo" src={`${process.env.PUBLIC_URL}/img/occtive_dark.png`} alt="OCCTIVE Logo" />
          </Link>

          {/* Primary navigation for desktop layouts */}
          <nav className="header-links" aria-label="Primary">
            {pages.map((page, index) => (
              <NavLink
                key={index}
                to={page.link}
                exact={page.link === '/'}
                className="header-link"
                activeClassName="active"
              >
                {page.title}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu toggle button */}
          <div className="header-mobile">
            <button className="header-mobile-button" type="button" onClick={() => setMenu(!menu)}>
              <img className="header-mobile-icon" src={HeaderMenu} alt="Mobile Menu" />
            </button>
          </div>
        </div>

        {/* Mobile navigation menu, shown when toggled */}
        <nav className={`header-mobile-links${menu ? ' open' : ''}`}>
          {pages.map((page, index) => (
            <NavLink key={index} to={page.link} className="header-link" activeClassName="active">
              {page.title}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
};

export default Header;
