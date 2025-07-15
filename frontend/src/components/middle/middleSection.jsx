import React from 'react';
import './middleSection.css';

const MiddleSection = () => {
  return (
    <section className="middle-section">

      {/* Existing testimonial/content section */}
      <div className="content">
        <h2>Your Team Is Lean. Your Conference Isn’t.</h2>
        <p>
          Planning a complex event with a small team? You’re not alone. From sponsor logistics to badge printing, registration forms to agenda chaos— you’re expected to handle it all, often with disconnected tools and no time to spare.
        </p>
        <ul>
          <li>Supporting multiple sponsors & speakers</li>
          <li>Planning a complex agenda and onsite flow</li>
          <li>Managing registration forms</li>
          <li>Handling on-site badge printing</li>
          <li>Proving engagement and ROI</li>
          <li>Juggling tools that don’t work together</li>
        </ul>
      </div>

      <div className="testimonial">
        <p className="quote">
          “I was impressed with EventMobi’s interface and how easy it was to select and interact with the different widgets. The content upload feature was especially invaluable to us with the easy-to-use templates.
        </p>
        <p className="highlight">
          Especially considering how short staffed we were, it helped relieve a lot of the stress!
        </p>
        <p className="author">
          <strong>Bethany Christensen</strong><br/>
          Marketing Manager, GetWellNetwork
        </p>
      </div>

      {/* New roadmap section */}
      <div className="roadmap-section">
        <div className="roadmap-text">
          <h2>Everything You Need. Nothing You Don’t.</h2>
          <p>
            You’re never locked in. Choose just the modules you want for any event type — from a one-day awards dinner to a multi-day user conference.
          </p>
          <ul>
            <li>Support virtual, in-person or hybrid events</li>
            <li>Use tools for every stage of the event lifecycle</li>
            <li>Integrate into your tech stack seamlessly</li>
            <li>Create events that provide the on-brand experience you want</li>
            <li>Pay for solutions you need, no one-size-fits-all package</li>
          </ul>
          <button className="platform-btn">See the platform →</button>
        </div>
        <div className="roadmap-image">
          <img src="https://www.eventmobi.com/wp-content/uploads/2025/06/EventMobi_Roadmap_2025-1024x760.png.webp" alt="Event Roadmap" />
        </div>
      </div>

    </section>
  );
};

export default MiddleSection;
