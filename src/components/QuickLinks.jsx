import { useState } from "react";
import { Link } from "react-router-dom";

const quickLinkCards = [
  {
    title: "Who we are",
    shortText:
      "Toah Nipi serves as a gathering place for individuals and groups to reflect and experience the goodness of God amidst the beauty of His creation.",
    longText:
      "Our camp exists to create space for rest, renewal, worship, conversation, and connection. Whether guests come as individuals, families, churches, or retreat groups, Toah Nipi is meant to be a peaceful place where people can slow down and reconnect with God, creation, and one another.",
    link: "/our-story",
  },
  {
    title: "Where we are",
    shortText: "Situated in the Monadnock Region of Southern New Hampshire.",
    longText:
      "Toah Nipi is located in a quiet lakeside setting surrounded by natural beauty. The location gives guests room to step away from everyday noise while still being accessible for churches, families, schools, and retreat groups throughout New England.",
    link: "/contact",
  },
  {
    title: "Retreats & Programs",
    shortText:
      "Learn how churches, ministries, businesses, and supporters can get involved.",
    longText:
      "Toah Nipi hosts custom retreats, church gatherings, leadership events, family programs, seasonal events, volunteer weekends, and special staff-led programs. Groups can bring their own speakers and programming while the camp provides the setting, meals, lodging, and gathering spaces.",
    link: "/events",
  },
];

export default function QuickLinks() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <section className="quick-links-section">
      {quickLinkCards.map((card, index) => {
        const isOpen = openCard === index;

        return (
          <article
            key={card.title}
            className={`feature-card expandable-card ${isOpen ? "is-open" : ""}`}
          >
            <button
              type="button"
              className="feature-card-toggle"
              onClick={() => setOpenCard(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <div>
                <h3>{card.title}</h3>
                <p>{card.shortText}</p>
              </div>

              <span className="dropdown-caret" aria-hidden="true">
                ▾
              </span>
            </button>

            <div className="feature-card-dropdown">
              <p>{card.longText}</p>

              <Link to={card.link} className="feature-card-link">
                Learn more →
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}