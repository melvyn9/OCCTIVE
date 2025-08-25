// File: src/layout/pages/ResourcePageContainer.tsx
import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import ResourcePage from '../components/ResourcePage';
import Footer from '../components/Footer';

const ResourcePageContainer: React.FC = () => (
  <>
    {/* no heroURL prop now */}
    <Header />

    <PageLayout>
      {/* <HomePage heroURL={header} /> prop removed inside HomePage */}
      <ResourcePage />
    </PageLayout>

    <Footer />
  </>
);

export default ResourcePageContainer;
