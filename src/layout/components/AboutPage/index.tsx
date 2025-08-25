import React from 'react';
import './style.scss';

const AboutPage: React.FC = () => (
  <main className="home-page">
    {/* OCCTIVE hero */}
    <section className="home-page-hero">
      <div className="home-page-hero-content">
        <div className="home-page-hero-text">
          <h1 className="home-page-title">About the Project</h1>
          <p className="home-page-text">
            This project brings together faculty from multiple institutions. Below you can
            find the project overview and contact information for leadership, evaluators,
            and affiliated faculty.
          </p>
        </div>
      </div>
    </section>

    {/* Short Intro Section */}
    <section className="about-section">
      <div className="about-block">
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
          ). The earlier project led to the initial development of{' '}
          <strong>
            OCCTIVE, the Online Computing-concepts Toolkit of Interdisciplinary
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
      </div>
    </section>

    {/* Project overview */}
    <section className="about-section">
      <div className="about-block">
        <h2 className="about-section-title">
          CUE Ethics: Evaluating Frameworks for Incorporating Computing Across
          the Curriculum
        </h2>

        <h3 className="about-intro-subtitle">Project abstract</h3>
        <p>
          This award will test pathways for the delivery of computing across the
          curriculum in the context of undergraduate degrees at residential liberal
          arts colleges. The project will be organized as a Networked Improvement
          Community (NIC) that includes faculty from three colleges representing
          10 distinct disciplines, as well as the heads of computer science and data
          science or data analytics at all three institutions. The NIC will provide an
          important opportunity for the project team to determine the most effective
          methods for delivering CS content and working with non-CS faculty across
          a range of governance and departmental structures. This project addresses
          the national desire to prepare larger and more diverse student populations
          for careers in both CS and non-CS fields.
        </p>
        <p>
          Project activities are five-fold. First, the project will identify a set of
          core computing concepts that should be learned by every student today,
          particularly those applying computing in non-CS fields. Second, it will
          rigorously evaluate the effectiveness of venues, including curriculum and
          course structure, for exposing students to the core concepts. Third, the
          project will analyze the preparation, guidance, and support necessary for
          non-CS faculty to teach these concepts. Fourth, it will analyze the extent to
          which adding computing material impacts student acquisition of disciplinary
          knowledge in non-CS courses. Lastly, it will analyze the impact on affiliated
          non-CS faculty with regard to their teaching and research as they learn more
          about computing, and work collaboratively with others on integration into
          courses. By including fields that are more demographically diverse than CS,
          the researchers expect to broaden the pool of students who learn about
          computing and its applications. By integrating ethical considerations into
          teaching from the start, students will learn to naturally ask ethical questions
          as part of problem solving instead of as an afterthought. Finally, the project
          will develop a guiding document for similar institutions on how to effectively
          infuse computing concepts across the curriculum. This IUSE: CUE project is
          co-funded by EHR/DUE and all CISE Directorates CNS, CCF, IIS, and OAC,
          reflecting the project&rsquo;s alignment with broader goals of the IUSE:EHR
          program and complementary programs in CISE.
        </p>

        <h3 className="about-intro-subtitle">About CUE Ethics</h3>
        <p>
          <a
            href="https://www.nsf.gov/funding/opportunities/iuse-cue-improving-undergraduate-stem-education-computing/505630/nsf19-546/solicitation"
            target="_blank"
            rel="noopener noreferrer"
          >
            NSF&rsquo;s IUSE:CUE
          </a>{' '}
          program focuses on preparing a diverse student population for careers in both
          CS and non-CS fields. The goal of this solicitation is to support teams of
          Institutions of Higher Education (IHEs) in re-envisioning the role of computing
          in interdisciplinary collaboration. NSF will also encourage IHEs to integrate
          ethics into curricula, both within core CS courses and across application
          areas. Projects are being jointly funded by NSF&rsquo;s Harnessing the Data
          Revolution Big Idea; the Directorate for Computer and Information Science and
          Engineering; the Directorate for Education and Human Resources; the Directorate
          for Mathematical and Physical Sciences; and the Directorate for Social,
          Behavioral and Economic Sciences.
        </p>
      </div>
    </section>

    {/* People */}
    <section className="about-section">
      <div className="about-block">
        <h2 className="about-section-title">Project Leadership</h2>
        <table className="about-table about-table--three">
          <colgroup>
            <col style={{ width: '30%' }} /> {/* Name */}
            <col style={{ width: '20%' }} /> {/* Role */}
            <col style={{ width: '50%' }} /> {/* Organization */}
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Institution</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Valerie Barr</td><td>co-PI</td><td>Bard College</td></tr>
            <tr><td>Andrea Tartaro</td><td>co-PI</td><td>Furman University</td></tr>
            <tr><td>Mia Minnes</td><td>co-PI</td><td>University of California San Diego</td></tr>
            <tr><td>Kristina Striegnitz</td><td>PI</td><td>Union College</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="about-section">
      <div className="about-block">
        <h2 className="about-section-title">Collaborators</h2>
        <table className="about-table about-table--three">
          <colgroup>
            <col style={{ width: '30%' }} /> {/* Name */}
            <col style={{ width: '20%' }} /> {/* Institution */}
            <col style={{ width: '50%' }} /> {/* Responsibilities */}
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>Institution</th>
              <th>Responsibilities</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>David Reider</td><td>Education Design</td><td>Evaluation</td></tr>
            <tr><td>Madalene Spezialetti</td><td>Trinity College</td><td>Video Collaboration</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className="about-section">
      <div className="about-block">
        <h2 className="about-section-title">Affiliated Faculty</h2>
        <table className="about-table about-table--three">
          <colgroup>
            <col style={{ width: '30%' }} /> {/* Name */}
            <col style={{ width: '20%' }} /> {/* Discipline */}
            <col style={{ width: '50%' }} /> {/* Organization */}
          </colgroup>
          <thead>
            <tr>
              <th>Name</th>
              <th>Discipline</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Liz McGrath</td><td>Astronomy</td><td>Colby College</td></tr>
            <tr><td>Jeff Corbin</td><td>Biology</td><td>Union College</td></tr>
            <tr><td>Ron Peck</td><td>Biology</td><td>Colby College</td></tr>
            <tr><td>Kyle Broaders</td><td>Chemistry</td><td>Mount Holyoke College</td></tr>
            <tr><td>Whitney King</td><td>Chemistry</td><td>Colby College</td></tr>
            <tr><td>Johannes Norling</td><td>Economics</td><td>Mount Holyoke College</td></tr>
            <tr><td>Kathrin Ellieroth</td><td>Economics</td><td>Colby College</td></tr>
            <tr><td>Tomas Dvorak</td><td>Economics</td><td>Union College</td></tr>
            <tr><td>Denise Bruesewitz</td><td>Env. Science</td><td>Colby College</td></tr>
            <tr><td>Alejandra Ortiz</td><td>Geology</td><td>Colby College</td></tr>
            <tr><td>Mason Stahl</td><td>Geology</td><td>Union College</td></tr>
            <tr><td>Kerstin Nordstrom</td><td>Physics</td><td>Mount Holyoke College</td></tr>
            <tr><td>Spencer Smith</td><td>Physics</td><td>Mount Holyoke College</td></tr>
            <tr><td>Derek Huffman</td><td>Psychology</td><td>Colby College</td></tr>
            <tr><td>Benjamin Gebre-Medhin</td><td>Sociology</td><td>Mount Holyoke College</td></tr>
            <tr><td>Christel Kesler</td><td>Sociology</td><td>Colby College</td></tr>
            <tr><td>Jim Scott</td><td>Statistics</td><td>Colby College</td></tr>
            <tr><td>Marie Ozanne</td><td>Statistics</td><td>Mount Holyoke College</td></tr>
            <tr><td>Roger Hoerl</td><td>Statistics</td><td>Union College</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
);

export default AboutPage;
