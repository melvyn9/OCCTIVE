// File: src/layout/pages/ResourcePageContainer.tsx
import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import AboutPage from '../components/AboutPage';
import Footer from '../components/Footer';

const AboutPageContainer: React.FC = () => (
  <>
    {/* no heroURL prop now */}
    <Header />

    <PageLayout>
      {/* <HomePage heroURL={header} /> prop removed inside HomePage */}
      <AboutPage />
    </PageLayout>

    <Footer />
  </>
);

export default AboutPageContainer;
