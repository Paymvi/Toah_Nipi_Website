export const partnerGroups = [
  {
    id: "ministry-partners",
    title: "Ministry Partners",
    description:
      "Organizations whose mission and relationship with Toah Nipi help strengthen retreat, discipleship, stewardship, and Christian community.",
    image: "/Apr-2026-Crowd.jpg",
    organizations: [
      {
        name: "A Rocha",
        logo: "/partner-logos/A-Rocha-2.png",
        description:
          "A Christian conservation organization helping communities care for creation and live out faithful stewardship.",
        website: "https://arocha.org/en/",
      },
      {
        name: "InterVarsity Christian Fellowship",
        logo: "/partner-logos/InterVarsity.webp",
        description:
          "A campus ministry movement helping students and faculty grow as disciples of Jesus.",
        website: "https://intervarsity.org/",
      },
      {
        name: "Sattler University",
        logo: "/partner-logos/Sattler.png",
        description:
          "A Christian university community connected to discipleship, formation, and service.",
        website: "https://sattler.edu/",
      },
      {
        name: "Add partner organization",
        logo: null,
        description:
          "Use this space for another ministry partner or organization connected to Toah Nipi.",
        website: null,
      },
    ],
  },
  {
    id: "returning-retreat-groups",
    title: "Returning Retreat Groups",
    description:
      "Churches, ministries, schools, and communities that continue to gather at Toah Nipi year after year.",
    image: "/Apr-2026-Circle-2.jpg",
    organizations: [
      {
        name: "Antioch Church",
        logo: "/partner-logos/Antioch-Church-2.png",
        description:
          "A returning church community that gathers at Toah Nipi for retreat, rest, and renewal.",
        website: null,
      },
      {
        name: "Local schools",
        logo: null,
        description:
          "Schools and student groups who use Toah Nipi as a place for reflection, learning, and connection.",
        website: null,
      },
      {
        name: "Local churches",
        logo: null,
        description:
          "Church communities who return for retreats, worship, fellowship, and time away together.",
        website: null,
      },
      {
        name: "Add annual group",
        logo: null,
        description:
          "Use this space for another church, ministry, school, or retreat group.",
        website: null,
      },
    ],
  },
  {
    id: "community-affiliations",
    title: "Community Affiliations",
    description:
      "Local and regional organizations connected to Toah Nipi through ongoing relationships, events, service, and shared hospitality.",
    image: "/Volunteering.png",
    organizations: [
      {
        name: "Add organization name",
        logo: null,
        description:
          "Use this space for a local or regional organization connected to Toah Nipi.",
        website: null,
      },
      {
        name: "Add organization name",
        logo: null,
        description:
          "Use this space for a community group, service partner, or local affiliation.",
        website: null,
      },
      {
        name: "Add organization name",
        logo: null,
        description:
          "Use this space for another organization connected through events or hospitality.",
        website: null,
      },
      {
        name: "Add organization name",
        logo: null,
        description:
          "Use this space for a future partner or community relationship.",
        website: null,
      },
    ],
  },
];

export function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}