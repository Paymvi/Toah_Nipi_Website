import { useState } from "react";
import "../styles/CoreValues.css";

const coreValues = [
  {
    number: "01",
    title: "Christ-Centered",
    statement: "We seek Christ first in everything we do.",
    description:
      "Every decision, conversation, and act of service begins with our desire to honor Christ and point others toward Him.",
    behaviors: [
      "Begin meetings and important decisions with prayer.",
      "Filter decisions through Scripture rather than convenience or preference.",
      "Respect others’ opinions.",
      "Share our faith naturally and respectfully when opportunities arise.",
    ],
    scripture:
      "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing.",
    reference: "John 15:5",
    progression: "Why we exist.",
  },

  {
    number: "02",
    title: "Gracious Hospitality",
    statement: "We embody an attitude of deep welcome.",
    description:
      "Our hospitality is more than excellent service—it is making people feel that they belong.",
    behaviors: [
      "Learn and use people’s names.",
      "Notice needs before people have to ask.",
      "Offer warm greetings and genuine conversation.",
      "Take ownership of problems rather than passing them to someone else.",
      "Leave every space cleaner, safer, and more inviting than you found it.",
      'Ask, "How can I make this experience even better?"',
      "Go the extra mile in supplying quality equipment, materials, and services.",
      "Monitor, assess, update, or upgrade equipment and services regularly to assure the highest quality.",
    ],
    scripture:
      "Be joyful in hope, patient in trouble, and persistent in prayer. Supply the needs of the saints. Extend hospitality to strangers.",
    reference: "Romans 12:12–13",
    progression: "How we host people.",
  },

  {
    number: "03",
    title: "Intentional Presence",
    statement:
      "We slow down enough to truly see people and create space for God to work.",
    description:
      "Transformation happens through relationships, not rushed interactions.",
    behaviors: [
      "Learn about our guests to best serve while respecting their privacy.",
      "Give people your full attention.",
      "Listen to understand.",
      "Pause your task when someone needs care.",
      "Pray with guests when appropriate.",
      "Choose people over productivity when the two compete.",
      "Create moments where people feel seen, heard, and known.",
    ],
    scripture:
      "Jesus stopped and called them. “What do you want me to do for you?” he asked.",
    reference: "Matthew 20:32",
    progression: "How we relate to people.",
  },

  {
    number: "04",
    title: "Faithful Stewardship",
    statement:
      "Everything we have belongs to God, and we care for it faithfully.",
    description:
      "We steward our finances, facilities, land, time, relationships, and gifts for His Kingdom.",
    behaviors: [
      "Treat the property as a sacred space.",
      "Use resources carefully and avoid waste.",
      "Be punctual.",
      "Use time wisely.",
      "Take initiative to fix small problems before they become large ones.",
      "Consider the long-term impact of decisions.",
      "Leave things better than you found them.",
    ],
    scripture:
      "Now it is required that those who have been given a trust must prove faithful.",
    reference: "1 Corinthians 4:2",
    progression: "How we care for God’s resources.",
  },

  {
    number: "05",
    title: "Sacred Simplicity",
    statement:
      "We remove distractions so we can focus on what is most important.",
    description:
      "We are people who slow down, breathe deeply, and hear God’s voice.",
    behaviors: [
      "Keep spaces uncluttered and beautiful.",
      "Protect quiet and peaceful environments.",
      "Eliminate unnecessary complexity.",
      "Make communication clear and easy to understand.",
      "Value quality over excess.",
      "Ask whether every activity helps or distracts from our mission.",
    ],
    scripture:
      "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls. For my yoke is easy and my burden is light.",
    reference: "Matthew 11:28–30",
    progression: "How we shape the environment.",
  },

  {
    number: "06",
    title: "Expectant Faith",
    statement:
      "We believe God is actively transforming lives and we serve with hope and confidence.",
    description:
      "We believe God will do more than we can accomplish ourselves; more than we can ask or imagine.",
    behaviors: [
      "Pray expectantly for each guest and every event.",
      "Celebrate stories of life change.",
      "Speak with hope instead of cynicism.",
      "Envision and plan for future growth.",
      "Embrace new opportunities with faith.",
      "Trust God during challenges and uncertainty.",
      "Encourage one another with reminders of God’s faithfulness.",
    ],
    scripture:
      "Now to him who is able to do immeasurably more than all we ask or imagine...",
    reference: "Ephesians 3:20",
    progression: "What we believe God will do.",
  },
];

export default function CoreValues() {
  const [openValue, setOpenValue] = useState(null);

  const toggleValue = (index) => {
    setOpenValue((current) => (current === index ? null : index));
  };

  return (
    <section className="core-values-section" id="core-values">
      <div className="core-values-inner">
        {/* =========================================
            INTRO
        ========================================== */}

        <div className="core-values-intro">
          <div className="core-values-intro-heading">
            <p className="core-values-label">What Shapes Us</p>

            <h2>Our Core Values</h2>
          </div>

          <div className="core-values-intro-copy">
            <p>
              These values shape how we serve, how we care for this place,
              and how we welcome each person who comes to Toah Nipi.
            </p>

            <p>
              Together, they express the kind of ministry and community we
              believe God has called us to be.
            </p>
          </div>
        </div>

        {/* =========================================
            VALUES
        ========================================== */}

        <div className="core-values-list">
          {coreValues.map((value, index) => {
            const isOpen = openValue === index;

            return (
              <article
                className={`core-value ${isOpen ? "is-open" : ""}`}
                key={value.title}
              >
                <div className="core-value-main">
                  <div className="core-value-identity">
                    <span className="core-value-number">
                      {value.number}
                    </span>

                    <div className="core-value-heading">
                      <h3>{value.title}</h3>

                      <p className="core-value-statement">
                        {value.statement}
                      </p>
                    </div>
                  </div>

                  <div className="core-value-copy">
                    <p className="core-value-description">
                      {value.description}
                    </p>

                    <blockquote className="core-value-scripture">
                      <p>“{value.scripture}”</p>

                      <cite>{value.reference}</cite>
                    </blockquote>

                    <button
                      type="button"
                      className="core-value-toggle"
                      onClick={() => toggleValue(index)}
                      aria-expanded={isOpen}
                      aria-controls={`core-value-details-${index}`}
                    >
                      <span>
                        {isOpen
                          ? "Hide observable behaviors"
                          : "View observable behaviors"}
                      </span>

                      <span
                        className="core-value-toggle-icon"
                        aria-hidden="true"
                      >
                        <span />
                        <span />
                      </span>
                    </button>
                  </div>
                </div>

                <div
                  id={`core-value-details-${index}`}
                  className="core-value-expand"
                  aria-hidden={!isOpen}
                >
                  <div className="core-value-expand-inner">
                    <div className="core-value-behavior-heading">
                      <span>In Practice</span>

                      <h4>Observable Behaviors</h4>
                    </div>

                    <ul className="core-value-behavior-list">
                      {value.behaviors.map((behavior) => (
                        <li key={behavior}>
                          <span
                            className="core-value-behavior-mark"
                            aria-hidden="true"
                          />

                          <span>{behavior}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* =========================================
          PROGRESSION
      ========================================== */}

      <div className="core-values-story">
        <div className="core-values-story-inner">
          <div className="core-values-story-heading">
            <p className="core-values-story-label">
              A Shared Direction
            </p>

            <h3>Our values tell a story.</h3>

            <p>
              Each one builds naturally on the one before it,
              reflecting the heart of Toah Nipi’s ministry.
            </p>
          </div>

          <div className="core-values-story-list">
            {coreValues.map((value) => (
              <div
                className="core-values-story-item"
                key={value.number}
              >
                <span className="core-values-story-number">
                  {value.number}
                </span>

                <div>
                  <h4>{value.title}</h4>
                  <p>{value.progression}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}