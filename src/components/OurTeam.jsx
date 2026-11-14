const trustees = [
  {
    name: "Saul De La Guardia",
    role: "Chairman of the Board",
    detail: "Senior Partner, Riemer Braunstein LLP",
    location: "Boston, MA",
    image: null,
  },
  {
    name: "Scott Mohr",
    role: "Treasurer",
    detail: "Retired, former Barclays Managing Director, Investment Banking",
    location: "Greenwich, CT",
    image: null,
  },
  {
    name: "Becky Lockhart",
    role: "Board Trustee",
    detail: "Retired Marketing and Sales Manager, Food and Pharmaceutical Industry",
    location: "Costa Mesa, CA",
    image: null,
  },
  {
    name: "Finny Kiruvilla",
    role: "Board Trustee",
    detail:
      "Chief Investment Officer, Eventide Asset Management; Founder, Chairman of the Board, Sattler College",
    location: "Boston, MA",
    image: null,
  },
  {
    name: "Jeff Barneson",
    role: "Board Trustee",
    detail: "Faculty Ministry, InterVarsity Christian Fellowship",
    location: "Cambridge, MA",
    image: null,
  },
  {
    name: "Matt Mascioli",
    role: "Board Trustee",
    detail: "Co-Founder & Principal, Fiat Lux Partners; Previously InterVarsity staff",
    location: "",
    image: null,
  },
  {
    name: "Paul Griffiths",
    role: "Board Trustee",
    detail: "Principal at Sannasig & Angel Investor at SeaAhead",
    location: "Boston, MA",
    image: null,
  },
  {
    name: "Greg Hodgson",
    role: "Executive Director",
    detail: "Toah Nipi Christian Retreat Center, 2002 to Present",
    location: "",
    image: null,
  },
];

const staff = [
  {
    name: "Abby Stroven",
    role: "CEO",
    detail: "",
    location: "",
    image: "/images/staff/abby-stroven.webp",
    photoPosition: "center 20%",
  },
  {
    name: "Greg Hodgson",
    role: "Executive Director",
    detail: "",
    location: "",
    image: "/images/staff/greg-hodgson.webp",
    photoPosition: "center 26%",
  },
  {
    name: "Elisha Hodgson",
    role: "Associate Director",
    detail: "",
    location: "",
    image: "/images/staff/elisha-hodgson.webp",
    photoPosition: "center 22%",
  },
  {
    name: "Arianne Miller",
    role: "Executive Chef",
    detail: "",
    location: "",
    image: "/images/staff/arianne-miller.webp",
    photoPosition: "center 20%",
  },
  {
    name: "Elizabeth Brown",
    role: "Office Administrator",
    detail: "",
    location: "",
    image: "/images/staff/elizabeth-brown.webp",
    photoPosition: "center 8%",
  },
  {
    name: "Anita Cunha",
    role: "Office Administrator",
    detail: "",
    location: "",
    image: "/images/staff/anita-cunha.webp",
    photoPosition: "center 8%",
  },
  {
    name: "Mindy Niemela",
    role: "Kitchen Coordinator",
    detail: "",
    location: "",
    image: "/images/staff/mindy-niemela.webp",
    photoPosition: "center 1%",
  },
  {
    name: "Crystal Baldwin",
    role: "Housekeeping",
    detail: "",
    location: "",
    image: "/images/staff/crystal-baldwin.webp",
    photoPosition: "center 5%",
  },
  {
    name: "Bill Burt",
    role: "Facilities Coordinator",
    detail: "",
    location: "",
    image: "/images/staff/bill-burt.webp",
    photoPosition: "center -10%",
  },
  {
    name: "Aahnix Bathurst",
    role: "Forest Stewardship Coordinator",
    detail: "",
    location: "",
    image: "/images/staff/aahnix-bathurst.webp",
    photoPosition: "center 4%",
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

function TeamCard({ person, showPhoto = true }) {
  return (
    <article className={`team-member-card ${!showPhoto ? "team-member-card-no-photo" : ""}`}>
      {showPhoto && (
        <div className="team-member-photo">
          {person.image ? (
            <img
              src={person.image}
              alt={person.name}
              loading="lazy"
              decoding="async"
              style={{
                objectPosition: person.photoPosition || "center center",
              }}
            />
          ) : (
            <span>{getInitials(person.name)}</span>
          )}
        </div>
      )}

      <div className="team-member-content">
        <p className="team-member-role">{person.role}</p>
        <h3>{person.name}</h3>

        {person.detail && <p>{person.detail}</p>}

        {person.location && (
          <p className="team-member-location">{person.location}</p>
        )}
      </div>
    </article>
  );
}

function TeamGroup({ title, subtitle, people, showPhotos = true }) {
  return (
    <div className="our-team-group">
      <div className="our-team-board-heading">
        <p>{title}</p>
        <span>{subtitle}</span>
      </div>

      <div className="our-team-grid">
        {people.map((person) => (
          <TeamCard
            person={person}
            showPhoto={showPhotos}
            key={`${title}-${person.name}-${person.role}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function OurTeam() {
  return (
    <section className="our-team-section" id="our-team">
      <div className="our-team-inner">
        <div className="our-team-header">
          <div>
            <p className="our-team-eyebrow">Our Team</p>
            <h2>Familiar faces, faithful leadership</h2>
          </div>

          <p>
            Introducing our team at Toah Nipi Christian Retreat Center. We’re here
            to help and support you as you plan and enjoy your retreat.
          </p>
        </div>

        <TeamGroup
          title="Board of Trustees"
          subtitle="2024–2026"
          people={trustees}
          showPhotos={false}
        />

        <TeamGroup
          title="Staff"
          subtitle="Day-to-day leadership"
          people={staff}
        />
      </div>
    </section>
  );
}