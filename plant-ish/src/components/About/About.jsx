import React from "react";
import { Link } from 'react-router-dom';
import "./About.css";

function About() {
  return (
    <div className='body'>
      <h2>About Plant-ish</h2>

      <div>
        <h3>Our Story</h3>
        <p>
          At Plant-ish, we believe in the power of plants to transform spaces,
          inspire creativity, and foster a sense of well-being. Our journey began
          with a shared passion for the botanical world and the desire to create
          a platform that celebrates the diversity and beauty of plants.
        </p>
      </div>

      <div>
        <h3>What Sets Us Apart</h3>

        <div>
          <h4>A Growing Community</h4>
          <p>
            Plant-ish is more than just a website; it's a community of plant
            enthusiasts, novices, and experts alike. We've cultivated an
            environment where plant lovers can connect, share their experiences,
            and learn from one another.
          </p>
        </div>

        <div>
          <h4>Your Green Haven</h4>
          <p>
            Explore our extensive database of plants to discover the perfect
            additions to your green haven. Whether you're a seasoned gardener or
            a beginner, Plant-ish is your go-to resource for plant information,
            care tips, and inspiration.
          </p>
        </div>

        <div>
          <h4>User-Friendly Plant Management</h4>
          <p>
            Take control of your plant collection by joining Plant-ish. With a
            free account, you can seamlessly add, edit, and delete plants from
            our user-friendly webpage. Your personalized plant profile is just a
            login away!
          </p>
        </div>
      </div>

      <div>
        <h3>How It Works</h3>
        <ul>
          <li>Explore: Browse through our vast collection of plants. Use our search feature to find specific plants or discover new favorites.</li>
          <li>Join: Sign up for a free account to unlock the full potential of Plant-ish. Your account gives you the ability to manage your own plant collection.</li>
          <li>Contribute: Share your plant knowledge with the community. Add, edit, or delete plants to curate your own virtual garden.</li>
        </ul>
      </div>

      <div>
        <h3>Our Mission</h3>
        <p>
          Plant-ish is on a mission to foster a deeper connection between people
          and plants. Through education, community engagement, and the joy of
          cultivating greenery, we aim to make the world a greener, more vibrant
          place.
        </p>
      </div>

      <div>
        <h3>Join Us on this Green Adventure!</h3>
        <p>
          Ready to embark on a botanical journey? Join Plant-ish today and be
          part of a community that shares your love for all things green. Let's
          grow together!
        </p>
      </div>
      <Link to="/registration">
        <button className="about-page-button">Sign Up</button>
      </Link>
      <Link to="/">
        <button className="about-page-button">Explore Plants</button>
      </Link>
    </div>
  );
}

export default About;
