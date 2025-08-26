// File: src/layout/components/WorkshopPage/index.tsx
import React from 'react';
import './style.scss';

const WorkshopPage: React.FC = () => (
  <main className="home-page">
    {/* Hero */}
    <section className="home-page-hero">
      <div className="home-page-hero-content">
        <div className="home-page-hero-text">
          <h1 className="home-page-title">About the Workshop</h1>
          <p className="home-page-text">
            Details for OCCTIVE adopters — dates, participation, and support provided.
          </p>
        </div>
      </div>
    </section>

    {/* Single section with everything inside one box */}
    <section className="workshop-section">
      <div className="workshop-block">
        <p>
          The workshop for OCCTIVE adopters will be at Union College, November 10-11, 2025.
        </p>

        <p>
          If you are interested in participating, complete this form.{' '}
          <strong>
            NOTE: For planning purposes, we request that you complete the participation form
            by September 16, 2025.
          </strong>
        </p>

        <p>
          This workshop will be a 1.5 day opportunity for non-CS faculty to work with the
          OCCTIVE grant team on ways to incorporate the video toolkit into their courses.
          The NSF funding provides support for adopting faculty in the form of:
        </p>

        <ul>
          <li>Reasonable travel expenses to attend the workshop.</li>
          <li>
            2 nights of hotel accommodation during the workshop (3 nights for people whose
            flight options are limited) and all workshop meals.
          </li>
          <li>
            Stipends for integrating OCCTIVE into a course, sharing relevant course material,
            and helping the grant team collect data to assess the video library.
          </li>
        </ul>

        <p>
          At our own schools, interested faculty have come from a wide range of fields:
          Economics, Geology, Biology/Ecology, Physics, Astronomy, Chemistry, Statistics,
          Sociology, Psychology, Environmental Science. Of course, we welcome participants
          from the full range of academic disciplines!! If you are interested in
          participating, there&rsquo;s more info{' '}
          <a
            className="adopt-link"
            href="https://melvyn9.github.io/OCCTIVE/#/adopt"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          , or you can contact the{' '}
          <a className="adopt-link" href="mailto:occtive@gmail.com">
            PI team
          </a>
          , or complete this{' '}
          <a
            className="adopt-link"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfFgShIgq2E8x5D74EdCb2TV4mXf0pp_wkICwgJyzsyyabzRQ/viewform?usp=send_form"
            target="_blank"
            rel="noopener noreferrer"
          >
            form
          </a>
          .{' '}
          <strong>
            NOTE: For planning purposes, we request that you complete the participation form
            by September 16, 2025.
          </strong>
        </p>
      </div>
    </section>
  </main>
);

export default WorkshopPage;
