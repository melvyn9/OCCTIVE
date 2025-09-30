// File: src/layout/components/AdoptPage/index.tsx
import React from 'react';
import './style.scss';

const AdoptPage: React.FC = () => (
  <main className="adopt-page">
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
        <p>
          Do you use computing in your science, social science, math, humanities, or arts
          courses? Your students will benefit from additional material to help them get
          comfortable with the underlying computing concepts. The OCCTIVE library contains
          short videos designed to integrate with your course activities. In these videos,
          students get clear, brief, engaging explanations that help them more confidently
          apply computing knowledge.
        </p>

        <p>
          The OCCTIVE videos can be helpful whether you use a little computing or a lot of
          computing in your course – you select the videos that make the most sense based on
          the computational elements! For example, OCCTIVE has been used in a biology course
          in which students use R for data analysis in just three lab sessions. It has also
          been used in an economics course where R is used in the majority of class sessions,
          and in a physics course that uses Python programming.
        </p>

        <p>
          We are always interested in having more faculty adopt the OCCTIVE library. If you
          are interested in integrating OCCTIVE into one or more of your courses and helping
          us collect data to evaluate the effectiveness of OCCTIVE, please{' '}
          <a
            className="adopt-link"
            href="https://forms.gle/CiLWR96ztVktb1TB9"
            target="_blank"
            rel="noopener noreferrer"
          >
            complete this form
          </a>
          .
        </p>

        <p>
          If you decide you’d like to attend our adoption workshop in November, 2025,{' '}
          <a
            className="adopt-link"
            href="https://forms.gle/fkwd2ghG2xmphutS6"
            target="_blank"
            rel="noopener noreferrer"
          >
            head here instead
          </a>
          .
        </p>

        <p>
          If you have questions, please{' '}
          <a
            className="adopt-link"
            href="mailto:occtive@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            reach out to the project team
          </a>
          .
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
