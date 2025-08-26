// File: src/layout/pages/WorkshopPageContainer.tsx
import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import WorkshopPage from '../components/WorkshopPage';
import Footer from '../components/Footer';

const WorkshopPageContainer: React.FC = () => (
  <>
    {/* no heroURL prop now */}
    <Header />

    <PageLayout>
      {/* <HomePage heroURL={header} /> prop removed inside HomePage */}
      <WorkshopPage />
    </PageLayout>

    <Footer />
  </>
);

export default WorkshopPageContainer;
