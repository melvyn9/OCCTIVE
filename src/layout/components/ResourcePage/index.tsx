// File: src/layout/components/HomePage/index.tsx
import React from 'react';
import './style.scss';

const ResourcePage: React.FC = () => (
  <main className="home-page">
    {/* OCCTIVE hero */}
    <section className="home-page-hero">
      <div className="home-page-hero-content">
        <div className="home-page-hero-text">
          <h1 className="home-page-title">Welcome to the Resource Page</h1>
          <p className="home-page-text">
            This is the resources page for the OCCTIVE site. Content to be added soon.
          </p>
        </div>
      </div>
    </section>
  </main>
);

export default ResourcePage;
