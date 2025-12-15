// File: Header/index.tsx
// Navigation header for OCCTIVE

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import HeaderMenu from '../../../assets/HeaderMenu.svg';
import { pages } from '../../../vars';
import './style.scss';

const Header: React.FC = () => {
  /* Controls visibility of the mobile navigation menu */
  const [menu, setMenu] = useState(false);

  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <>
      {/* Header landmark identifies site-wide banner */}
      <header className="header">
        <div className="header-content">
          <Link to="/" onClick={closeMenu}>
            <img
              className="header-logo"
              src={`${process.env.PUBLIC_URL}/img/occtive_dark.png`}
              alt="OCCTIVE Logo"
            />
          </Link>

          {/* ---------- DESKTOP LINKS ---------- */}
          <div className="header-links">
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
          </div>

          {/* ---------- HAMBURGER ---------- */}
          <div className="header-mobile">
            <button
              className="header-mobile-button"
              type="button"
              onClick={() => setMenu(!menu)}
              aria-label="Toggle navigation menu"
            >
              <img
                className="header-mobile-icon"
                src={HeaderMenu}
                alt="Mobile menu"
              />
            </button>
          </div>
        </div>

        {/* ---------- MOBILE DROPDOWN ---------- */}
        <div className={`header-mobile-links${menu ? ' open' : ''}`}>
          {pages.map((page, index) => (
            <NavLink
              key={index}
              to={page.link}
              exact={page.link === '/'}
              className="header-link"
              activeClassName="active"
              onClick={closeMenu}
            >
              {page.title}
            </NavLink>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;
