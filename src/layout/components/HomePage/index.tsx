// File: HomePage/index.tsx
// This file defines the HomePage component, which is the main landing page
// for the "Computing Paths" website.
// The homepage includes sections for majors, stories and advice,
// student organizations, and projects.
// The content is dynamically fetched using a custom `useData` hook, and the
// page layout is enhanced with carousel functionality.

import React, { useRef } from 'react';

import CarouselRightArrow from '../../../assets/CarouselRightArrow.svg';
import CarouselLeftArrow from '../../../assets/CarouselLeftArrow.svg';

import './style.scss';

// Interface defining the props for the HomePage content
interface HomePageProps {
  heroURL: string; // URL for the hero image displayed on the homepage
}

// The HomePage component is a functional component that renders the main landing page.
// It uses the `useState` hook to manage the state of majors, home data, and stories,
// and the `useEffect` hook to fetch data on mount.
const HomePage: React.FC<HomePageProps> = ({ heroURL }) => {
  // Majors carousel container for handling scroll functionality
  const menuRef = useRef<HTMLDivElement>(null);

  // Function to handle carousel navigation
  const handleNav = (event) => {
    if (menuRef && menuRef.current) {
      const element = (menuRef.current.childNodes[0] as HTMLDivElement);

      // Sourced from: https://stackoverflow.com/a/23270007
      const style = window.getComputedStyle(element);
      const width = element.offsetWidth;
      const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
      const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

      const elementSize = width + margin - padding + border;

      // Scroll the container baed on left or right arrow
      if (event.target.className.includes('home-page-left-arrow')) {
        menuRef.current.scrollBy({
          top: 0,
          left: -elementSize,
          behavior: 'smooth',
        });
      } else {
        menuRef.current.scrollBy({
          top: 0,
          left: +elementSize,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <main className="home-page">
      {/* Hero section with title and hero image */}
      <section className="home-page-landing">
        <div className="home-page-title-section">
          <h1 className="home-page-title">Discover Your Path in Computing</h1>
        </div>
        <img className="home-page-image" src={heroURL} alt="home page logo" width="320" height="344" />
      </section>
      <h2 className="home-page-header major">Majors</h2>

      {/* Majors section with carousel functionality */}
      <button className="home-page-left-arrow" type="submit" onClick={handleNav}>
        <img className="home-page-left-arrow-button" src={CarouselLeftArrow} alt="Left Arrow" />
      </button>
      <button className="home-page-right-arrow" type="submit" onClick={handleNav}>
        <img className="home-page-right-arrow-button" src={CarouselRightArrow} alt="Right Arrow" />
      </button>
    </main>
  );
};

export default HomePage;
