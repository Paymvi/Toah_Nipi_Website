import { useState } from "react";
import { Link } from "react-router-dom";

const quickLinkCards = [
  {
    title: "Who we are",
    shortText: (
      <>
        Toah Nipi is a <strong>Christian retreat center</strong> where individuals
        and groups gather to <strong>reflect </strong> and experience the{" "}
        <strong>goodness of God</strong> in the beauty of His creation.
      </>
    ),
    longText: (
      <>
        Our camp exists to create space for <strong>rest, renewal, worship,
        conversation,</strong> and <strong>connection</strong>. Whether guests come
        as individuals, families, churches, or retreat groups, Toah Nipi is meant
        to be a peaceful place where people can <strong>slow down</strong> and
        reconnect with <strong>God, creation,</strong> and <strong>one another</strong>.
      </>
    ),
    link: "/our-story",
  },
  {
    title: "Where we are",
    shortText: (
      <>
        Situated in the <strong>Monadnock Region</strong> of Southern New Hampshire.
      </>
    ),
    longText: (
      <>
        Surrounded by <strong>Mt. Watatic, Mt. Monadnock, scenic trails,</strong>{" "}
        and a <strong>quiet lake</strong>, Toah Nipi offers a beautiful setting to{" "}
        <strong>rest, reconnect,</strong> and enjoy the outdoors.
      </>
    ),
    link: "/contact",
  },
  {
    title: "Retreats & Programs",
    shortText: (
      <>
        Learn how <strong>churches, ministries, businesses,</strong> and{" "}
        <strong>supporters</strong> can get involved.
      </>
    ),
    longText: (
      <>
        Toah Nipi hosts <strong>custom retreats, church gatherings, leadership
        events, family programs, seasonal events, volunteer weekends,</strong> and{" "}
        <strong>special staff-led programs</strong>. Groups can bring their own
        speakers and programming while the camp provides the{" "}
        <strong>setting, meals, lodging,</strong> and <strong>gathering spaces</strong>.
      </>
    ),
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