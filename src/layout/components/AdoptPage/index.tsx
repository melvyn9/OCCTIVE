// File: src/layout/components/AdoptPage/index.tsx
import React from 'react';
import './style.scss';

const AdoptPage: React.FC = () => (
  <main className="home-page">
    {/* OCCTIVE hero */}
    <section className="home-page-hero">
      <div className="home-page-hero-content">
        <div className="home-page-hero-text">
          <h1 className="home-page-title">Adopt OCCTIVE</h1>
          <p className="home-page-text">
            Bring OCCTIVE into your course. Below you’ll find who can participate, what’s
            involved, the support you’ll receive, and resources to help you adopt the video
            toolkit.
          </p>
        </div>
      </div>
    </section>

    {/* Intro */}
    <section className="adopt-section">
      <div className="adopt-block">
        <h2>Interested in adopting OCCTIVE?</h2>
        <p>
          Do you use computing in your science, social science, math, humanities, or arts
          courses? Would your students benefit from additional material to help them get
          comfortable with the underlying computing concepts? The OCCTIVE library contains
          short videos you can integrate with your course activities. In these videos,
          students get clear, brief, engaging explanations that help them more confidently
          apply computing knowledge.
        </p>
        <p>
          <a
            className="adopt-link"
            href="https://melvyn9.github.io/OCCTIVE/#/"
            target="_blank"
            rel="noopener noreferrer"
          >
            The OCCTIVE videos
          </a>{' '}
          have already been used in a range of courses at several institutions. One adopting
          faculty member said “I thought that they really were a great way for me to be able
          to efficiently get information across more effectively than if I tried to do it…
          I thought that the videos were clean and watchable.”
          <strong>
            We&rsquo;re preparing to welcome a new cohort of faculty adoptees.
          </strong>
          If you are interested in integrating
          OCCTIVE into one or more of your courses and helping us collect data to evaluate
          the effectiveness of OCCTIVE, please complete{' '}
          <a
            className="adopt-link"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfFgShIgq2E8x5D74EdCb2TV4mXf0pp_wkICwgJyzsyyabzRQ/viewform?usp=send_form"
            target="_blank"
            rel="noopener noreferrer"
          >
            this form
          </a>
          . (
          <strong>
            NOTE: For planning purposes, we request that you complete the participation
            form by September 16, 2025.
          </strong>) If you have questions, please{' '}
          <a
            className="adopt-link"
            href="mailto:occtive@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            reach out to the project team.
          </a>
        </p>
        <p>
          OCCTIVE is supported by the NSF grant “The efficacy of OCCTIVE: A computing-concepts
          video library for students and peer tutors in multidisciplinary contexts” (award
          nos. 2337251, 2337252, 2337253, 2337254). The first version was developed as part of
          the NSF grant “Evaluating Frameworks for Incorporating Computing Across the
          Curriculum” (award nos. 1935113, 1935099, 1935061).
        </p>
      </div>
    </section>

    {/* More Information */}
    <section className="adopt-section">
      <div className="adopt-block">
        <h2>Interested? Then here&rsquo;s more information</h2>

        <h3>Who can participate?</h3>
        <p>
          We welcome participants from all academic disciplines. Adopting faculty at our own
          schools come from a wide range of fields: Economics, Geology, Biology/Ecology,
          Physics, Astronomy, Chemistry, Statistics, Sociology, Psychology, Environmental
          Science.
        </p>
        <p>
          The videos can be helpful whether you use a little computing or a lot of computing
          in your course – you select the videos that make the most sense based on the
          computational elements!
        </p>
        <p>
          Most but not all adopting faculty were using R or Python in their courses, though
          there are language-agnostic videos.
        </p>
        <p>
          While we invite everyone to use the OCCTIVE videos, our financial support is
          restricted to participants from US institutions.
        </p>

        <h3>What will participants do?</h3>
        <ul>
          <li>
            Attend an in-person workshop on November 10-11, 2025 held at Union College in
            Schenectady, NY. This workshop will be a 1.5 day opportunity to work with the
            grant team and other faculty adopting OCCTIVE on ways to incorporate the video
            toolkit into a course.
          </li>
          <li>
            Collect control group data in their course in an offering prior to introduction
            of OCCTIVE.
          </li>
          <li>Integrate OCCTIVE into class offering.</li>
          <li>Collect evaluation data in the course offering that uses OCCTIVE.</li>
          <li>Note that for later adopters there will be a virtual workshop in 2025.</li>
        </ul>

        <h3>What will participants get?</h3>
        <ul>
          <li>Access to the OCCTIVE videos and some supplementary material.</li>
          <li>
            Opportunity to work with colleagues at other institutions who teach similar
            courses and are adopting OCCTIVE.
          </li>
          <li>
            Reasonable travel expenses to attend the November 2025 workshop 2 nights of
            hotel accommodation during the workshop (3 nights for people whose flight options
            are limited) and all workshop meals.
          </li>
          <li>
            Stipends for integrating OCCTIVE into a course, sharing relevant course material,
            and helping the grant team collect data to assess the video library.
          </li>
        </ul>

        <h3>
          Can I use the material without participating in the full list of activities?
        </h3>
        <p>
          OCCTIVE is a public resource so anybody can adopt it, but more support will be
          given to faculty who fully engage with the project team.
        </p>
        <p>
          Participating in data collection is not required for OCCTIVE adopters, but helpful
          to the project team. To indicate your willingness to support the project team with
          data collection, please complete{' '}
          <a
            className="adopt-link"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdy5MtrwNQZ9VHM32Tjm6UL3MTuc9vu-oQ9vknjkVrviUYC0g/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            this form
          </a>
          .
        </p>
      </div>
    </section>

    {/* Faculty Resources */}
    <section className="adopt-section">
      <div className="adopt-block">
        <h2>Faculty Resources</h2>

        <h3>Guide to Videos</h3>
        <p>
          Check out the{' '}
          <a
            className="adopt-link"
            href="https://melvyn9.github.io/OCCTIVE/#/"
            target="_blank"
            rel="noopener noreferrer"
          >
            full video list
          </a>{' '}
          and a{' '}
          <a
            className="adopt-link"
            href="https://docs.google.com/drawings/d/1lD1CxMXV6G_83KfyaABuvqY-g2SodAKmKiVu3FFWMo8/edit"
            target="_blank"
            rel="noopener noreferrer"
          >
            flowchart
          </a>{' '}
          that shows video dependencies.
        </p>

        <h3>Video Captions</h3>
        <p>
          If interested in searching for coverage of a particular topic, the complete captions
          of all videos are viewable here.
        </p>

        <h3>Sample Exercises</h3>
        <p>
          This{' '}
          <a
            className="adopt-link"
            href="https://occtive.github.io/www/gfx/Example%20Exercises.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            document
          </a>{' '}
          contains a number of exercises that provide examples for faculty who would like to
          create their own reinforcing exercises students can work on after watching the videos.
        </p>

        <h3>Evaluating Code</h3>
        <p>Coming soon …. some guidance on how to evaluate student code!</p>

        <h3>Resources for Further Exploration</h3>
        <ul>
          <li>
            <a
              className="adopt-link"
              href="https://posit.co/resources/cheatsheets/"
              target="_blank"
              rel="noopener noreferrer"
            >
              RStudio Cheatsheets
            </a>
          </li>
          <li>
            <a
              className="adopt-link"
              href="http://adv-r.had.co.nz/Style.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Advanced R, a style guide by Hadley Wickham
            </a>
          </li>
          <li>
            <a
              className="adopt-link"
              href="https://mdsr-book.github.io/mdsr2e/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Modern Data Science with R by Benjamin S. Baumer, Daniel T. Kaplan, and Nicholas
              Horton
            </a>
          </li>
          <li>
            <a
              className="adopt-link"
              href="https://data-feminism.mitpress.mit.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Data Feminism by Catherine D’Ignazio and Lauren F. Klein
            </a>
          </li>
        </ul>
      </div>
    </section>

  </main>
);

export default AdoptPage;
