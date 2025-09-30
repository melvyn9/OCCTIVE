// File: src/layout/components/WorkshopPage/index.tsx
import React from 'react';
import './style.scss';

const WorkshopPage: React.FC = () => (
  <main className="workshop-page">
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

    {/* Content */}
    <section className="workshop-section">
      <div className="workshop-block">
        <p>
          The workshop for OCCTIVE adopters will be at Union College, November 10-11, 2025.
        </p>

        <p>
          This workshop will be a 1.5 day opportunity for non-CS faculty to work with the
          OCCTIVE grant team on ways to incorporate the video toolkit into their courses.
          The NSF funding provides support for adopting faculty in the form of:
        </p>

        <ul>
          <li>Reasonable travel expenses to attend the workshop</li>
          <li>
            2 nights of hotel accommodation during the workshop (3 nights for people whose
            flight options are limited) and all workshop meals
          </li>
          <li>
            Stipends for integrating OCCTIVE into a course, sharing relevant course material,
            and helping the grant team collect data to assess the video library
          </li>
        </ul>

        <p>
          Adopting faculty to date have come from a wide range of fields: Economics, Geology,
          Biology/Ecology, Physics, Astronomy, Chemistry, Statistics, Sociology, Psychology,
          Environmental Science. Of course, we welcome participants from the full range of
          academic disciplines!! If you are interested in participating, complete{' '}
          <a className="adopt-link" href=" https://forms.gle/fkwd2ghG2xmphutS6" target="_blank" rel="noopener noreferrer">
            this form
          </a>
          .
        </p>

        <p>
          <strong>
            NOTE: For planning purposes, we request that you complete the participation form
            by October 10, 2025.
          </strong>
        </p>

        <ul>
          <li>
            While we invite everyone to use the OCCTIVE videos, our financial support is
            restricted to participants from US institutions.
          </li>
        </ul>

        <h3>What will participants do?</h3>
        <ul>
          <li>
            Attend an in-person workshop on November 10-11, 2025 held at Union College in
            Schenectady, NY. This workshop will be a 1.5 day opportunity to work with the grant
            team and other faculty adopting OCCTIVE on ways to incorporate the video toolkit
            into a course.
          </li>
          <li>
            Collect control group data in their course in an offering prior to introduction
            of OCCTIVE.
          </li>
          <li>Integrate OCCTIVE into class offering.</li>
          <li>
            Collect evaluation data in the course offering that uses OCCTIVE.
          </li>
        </ul>

        <h3>What will participants get?</h3>
        <ul>
          <li>Access to the OCCTIVE videos and some supplementary material</li>
          <li>
            Opportunity to work with colleagues at other institutions who teach similar
            courses and are adopting OCCTIVE
          </li>
          <li>
            Reasonable travel expenses to attend the November 2025 workshop 2 nights of
            hotel accommodation during the workshop (3 nights for people whose flight
            options are limited) and all workshop meals
          </li>
          <li>
            Stipends for integrating OCCTIVE into a course, sharing relevant course
            material, and helping the grant team collect data to assess the video library
          </li>
        </ul>

        <h3>Can I use the material without participating in the full list of activities?</h3>
        <p>
          OCCTIVE is a public resource so anybody can adopt it, but more support will be
          given to faculty who fully engage with the project team. If you read this far and
          decided you’d like to adopt OCCTIVE but not attend the workshop, please{' '}
          <a className="adopt-link" href="https://forms.gle/CiLWR96ztVktb1TB9" target="_blank" rel="noopener noreferrer">
            head here instead
          </a>
          .
        </p>
      </div>
    </section>
  </main>
);

export default WorkshopPage;
