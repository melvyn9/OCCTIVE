// File: src/layout/pages/HomePageContainer.tsx
import React from 'react';
import Header from '../components/Header';
import PageLayout from './PageLayout';
import HomePage from '../components/HomePage';
import Footer from '../components/Footer';

const HomePageContainer: React.FC = () => (
  <>
    {/* no heroURL prop now */}
    <Header />

    <PageLayout>
      {/* <HomePage heroURL={header} /> prop removed inside HomePage */}
      <HomePage />
    </PageLayout>

    <Footer />
  </>
);

export default HomePageContainer;
