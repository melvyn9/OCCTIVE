import React from 'react';

import Header from '../components/Header';
import PageLayout from './PageLayout';
import MajorPage from '../components/MajorPage';
import Footer from '../components/Footer';

const MajorPageContainer: React.FC = () => (
  <>
    <Header />
    <PageLayout>
      <MajorPage />
    </PageLayout>
    <Footer />
  </>
);

export default MajorPageContainer;
