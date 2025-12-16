// File: src/layout/components/AboutPage/index.tsx
// Describes the OCCTIVE project, its goals, and project leadership.

import React from 'react';
import './style.scss';

const AboutPage: React.FC = () => (
  <main className="about-page">
    {/* OCCTIVE hero */}
    <section className="home-page-hero">
      <header className="home-page-hero-content">
        <section className="home-page-hero-text">
          <h1 className="home-page-title">The OCCTIVE Project</h1>
          <p className="home-page-text">
            The OCCTIVE Project offers resources to introduce foundational computing concepts
            with applications in the sciences, humanities, and beyond.
          </p>
        </section>
      </header>
    </section>

    {/* Short Intro Section */}
    <section className="about-section">
      <article className="about-block">
        <p>
          This multi-institution,{' '}
          <a
            href="https://www.nsf.gov/funding/opportunities/iuse-cue-improving-undergraduate-stem-education-computing/505630/nsf19-546/solicitation"
            target="_blank"
            rel="noopener noreferrer"
          >
            NSF-funded IUSE
          </a>{' '}
          project extends previous work (see{' '}
          <a
            href="https://nsf-cue-frameworks.github.io/www/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            OCCTIVE Version 1
          </a>
          , including the{' '}
          <a
            href="https://occtive.github.io/www/videos.html#Old_Videos_(from_original_project)"
            target="_blank"
            rel="noopener noreferrer"
          >
            archive of earlier videos
          </a>
          ). The earlier project led to the initial development of{' '}
          <strong>
            OCCTIVE, the Online Computing-Concepts Toolkit of Interdisciplinary
            Videos for Education.
          </strong>{' '}
          This video library is intended primarily for use in non-CS courses that use
          computing, providing students with strong understanding of foundational
          concepts that will be transferable as they continue to encounter computing
          within their fields of study. In this new project we are improving the existing
          videos, adding new videos, and carrying out robust evaluation to determine the
          impact on students&rsquo; understanding of and ability to use core computing
          concepts.
        </p>
      </article>
    </section>

    {/* Project overview */}
    <section className="about-section">
      <article className="about-block">
        <h2 className="about-section-title">
          The efficacy of a computing-concepts video library for students and peer
          tutors in multidisciplinary contexts
        </h2>

        <h3 className="about-intro-subtitle">Project abstract</h3>
        <p>
          This project aims to serve the national interest by preparing students in
          non-computing majors to use computational techniques in their academic
          work and future careers. Increasingly, students in all disciplines must
          learn to use computing technology. To meet the increased need for students
          to use computational methods across all fields, non-computing courses
          commonly integrate computational components into their curricula. However,
          many non-computing faculty are not prepared to teach the computing
          concepts that underlie the computational techniques that their students
          must master. This project will support non-computing faculty who are
          teaching computing concepts by developing a curated set of videos that
          provides the content needed for students to learn basic computing
          concepts. The infusion of foundational computing concepts into
          non-computing courses will increase both the number and diversity of
          students who are prepared to utilize computational technologies when they
          enter the workforce.
        </p>
        <p>
          This project&rsquo;s goals are to (1) expand and strengthen the OCCTIVE
          video library (Online Computing-Concepts Toolkit of Interdisciplinary
          Videos for Education), designed to introduce foundational computing
          concepts in non-CS courses, (2) broadly disseminate OCCTIVE for use by
          non-CS faculty and peer tutors, and (3) assess the impact of OCCTIVE use
          on students, faculty, and peer tutors. The expansion and improvement of
          the OCCTIVE library will be informed by best practices in instructional
          video design. The videos will be supplemented with sample teaching
          material and other support materials that aid faculty adoption. Faculty,
          who will be recruited from a wide range of disciplines and institutions,
          will be trained to integrate OCCTIVE into their courses through in person
          and virtual workshops. The efficacy of the OCCTIVE library will be
          measured by assessing students&rsquo; comprehension of computing concepts,
          faculty&rsquo;s adoption of materials in their classes, and peer tutor
          experiences. The NSF IUSE: EDU Program supports research and development
          projects to improve the effectiveness of STEM education for all students.
          Through the Engaged Student Learning track, the program supports the
          creation, exploration, and implementation of promising practices and
          tools.
        </p>
      </article>
    </section>

    {/* Project leadership and contributors */}
    <section className="about-section">
      <article className="about-block">
        <h2 className="about-section-title">Project Leadership</h2>
        <table className="about-table about-table--three">
          <colgroup>
            <col style={{ width: '30%' }} /> {/* Name */}
            <col style={{ width: '20%' }} /> {/* Role */}
            <col style={{ width: '50%' }} /> {/* Institution */}
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Institution</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Kristina Striegnitz</td><td>PI</td><td>Union College</td></tr>
            <tr><td>Valerie Barr</td><td>co-PI</td><td>Bard College</td></tr>
            <tr><td>Andrea Tartaro</td><td>co-PI</td><td>Furman University</td></tr>
            <tr><td>Mia Minnes</td><td>co-PI</td><td>University of California San Diego</td></tr>
            <tr><td>David Reider</td><td>Evaluation</td><td>Education Design</td></tr>
            <tr>
              <td>Madalene Spezialetti</td>
              <td>Video Collaboration</td>
              <td>Trinity College</td>
            </tr>
            <tr><td>Nick Webb</td><td>Workshop Collaboration</td><td>Union College</td></tr>
          </tbody>
        </table>
      </article>
    </section>
  </main>
);

export default AboutPage;
