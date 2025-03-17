import React from 'react';
import { TypeAnimation } from 'react-type-animation';

import '../css/landing.css';

const ThoughtyHome = () => {
  return (
    <div className="thoughty-home">
      <main>
        <section id="sec-1" className="thoughty-home__sec-1">
          <TypeAnimation
        sequence={[
          'Unleash Your Thoughts.', // Types 'One'
          1000, // Waits 1s
          'Challenge Ideas. Evolve.', // Deletes 'One' and types 'Two'
          2000, // Waits 2s
          () => {
            console.log('Sequence completed');
          },
        ]}
        wrapper="h1"
        cursor={true}
        repeat={Infinity}
        className='thoughty-home__title'
      />
          <div className="thoughty-home__content-box">
            <p>
              Thoughty is a digital thought marketplace where creative minds come together to share deep questions, innovative ideas, and unfinished concepts. Here, you can refine your thoughts, spark intellectual debates, brainstorm revolutionary solutions, and engage in friendly mind battles. Join us and transform the way you think!
            </p>
          </div>

          <div className="thoughty-home__icons-group">
            <i className="fa-solid fa-circle thoughty-home__icon--small"></i>
            <i className="fa-solid fa-circle thoughty-home__icon--medium"></i>
            <i className="fa-solid fa-lock thoughty-home__icon--locker"></i>
            <i className="fa-solid fa-circle thoughty-home__icon--medium"></i>
            <i className="fa-solid fa-circle thoughty-home__icon--small"></i>
          </div>

          <div className="thoughty-home__feature-container">
            {/* Card 1: Creative Flow */}
            <div className="thoughty-home__feature">
              <i className="fas fa-lightbulb thoughty-home__feature-icon"></i>
              <h3>Creative Flow</h3>
              <p>
                Harness your ideas with our incubator. Post your thoughts and ignite inspiration with our brainstorming roulette.
              </p>
            </div>
            {/* Card 2: Intellectual Duels */}
            <div className="thoughty-home__feature thoughty-home__feature--large">
              <i className="fas fa-fire-alt thoughty-home__feature-icon"></i>
              <h3>Intellectual Duels</h3>
              <p>
                Engage in thought battles, challenge prevailing ideas, debate vigorously, and earn rewards as your ideas shine.
              </p>
            </div>
            {/* Card 3: Personal Insights */}
            <div className="thoughty-home__feature">
              <i className="fas fa-chart-line thoughty-home__feature-icon"></i>
              <h3>Personal Insights</h3>
              <p>
                Dive into a safe, anonymous space and unlock AI-powered insights that reveal your unique intellectual journey.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ThoughtyHome;
