/* =========================================================
   RELATIONSHIPS
   Single source of truth for the Partners relationship wall.

   Every organization belongs in THIS FILE ONLY.

   Each relationship has:
   - name
   - category
   - rank
   - logo
   - website
========================================================= */


/* =========================================================
   CATEGORY IDS
========================================================= */

export const RELATIONSHIP_CATEGORY = {
  MINISTRY: "ministry-partners",
  RETREAT: "returning-retreat-groups",
  COMMUNITY: "community-affiliations",

  /*
    Temporary category for organizations whose final
    category has not been assigned yet.
  */
  UNCATEGORIZED: "uncategorized",
};


/* =========================================================
   FILTER CATEGORIES

   Uncategorized organizations still appear when
   "All Relationships" is selected.

   We intentionally do NOT show an "Uncategorized"
   button to visitors.
========================================================= */

export const relationshipCategories = [
  {
    id: "all",
    label: "All Relationships",
  },

  {
    id: RELATIONSHIP_CATEGORY.MINISTRY,
    label: "Ministry Partners",
  },

  {
    id: RELATIONSHIP_CATEGORY.RETREAT,
    label: "Retreating Retreat Groups",
  },

  {
    id: RELATIONSHIP_CATEGORY.COMMUNITY,
    label: "Community Affiliations",
  },
];


/* =========================================================
   RELATIONSHIPS
========================================================= */

export const relationships = [

  /* =======================================================
     MINISTRY PARTNERS
  ======================================================= */

  {
    name: "InterVarsity",

    category:
      RELATIONSHIP_CATEGORY.MINISTRY,

    rank: 10,

    logo:
      "/partner-logos/InterVarsity.webp",

    website:
      "https://intervarsity.org/",
  },


  {
    name: "A Rocha USA",

    category:
      RELATIONSHIP_CATEGORY.MINISTRY,

    rank: 1,

    logo:
      "/partner-logos/A-Rocha-2.png",

    website:
      "https://arocha.org/en/",
  },


  {
    name: "Sattler University",

    category:
      RELATIONSHIP_CATEGORY.MINISTRY,

    rank: 7,

    logo:
      "/partner-logos/Sattler.png",

    website:
      "https://sattler.edu/",
  },


  /* =======================================================
     RETURNING RETREAT GROUPS
  ======================================================= */

  {
    name: "Antioch Church",

    category:
      RELATIONSHIP_CATEGORY.RETREAT,

    rank: 9,

    logo:
      "/partner-logos/Antioch-Church-2.png",

    website: null,
  },


  /* =======================================================
     CATEGORY STILL NEEDS TO BE ASSIGNED

     These organizations are real relationships and have
     their rankings, but we do not yet know which of the
     three public categories they belong in.

     They WILL appear under "All Relationships."
  ======================================================= */

  {
    name: "Boston College",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 8,

    logo: null,

    website: null,
  },


  {
    name: "Assembly of God Mission Ministry",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 8,

    logo: null,

    website: null,
  },


  {
    name: "New England Church Planting Network",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 2,

    logo: null,

    website: null,
  },


  {
    name: "First Baptist Church of Yarmouth",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 2,

    logo: null,

    website: null,
  },


  {
    name: "Redemptoris Mater Seminary",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 1,

    logo: null,

    website: null,
  },


  {
    name: "First Baptist Church of Sudbury",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 3,

    logo: null,

    website: null,
  },


  {
    name: "Academy of Notre Dame",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 3,

    logo: null,

    website: null,
  },


  {
    name: "Congregation Lion of Judah",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 2,

    logo: null,

    website: null,
  },


  {
    name: "NewCity Church",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 2,

    logo: null,

    website: null,
  },


  {
    name: "The Garden Church-Boston",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 3,

    logo: null,

    website: null,
  },


  {
    name: "Providence Hmong",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 4,

    logo: null,

    website: null,
  },


  {
    name: "Resurrection Church-East Boston",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 4,

    logo: null,

    website: null,
  },


  {
    name: "Boston Chinese Evangelical Church",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 3,

    logo: null,

    website: null,
  },


  {
    name:
      "Longwood/Boston Healthcare Fellowship",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 6,

    logo: null,

    website: null,
  },


  {
    name: "Beacon Church",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 1,

    logo: null,

    website: null,
  },


  {
    name: "Harvard University",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 8,

    logo: null,

    website: null,
  },


  {
    name: "Aletheia Church",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 8,

    logo: null,

    website: null,
  },


  {
    name: "Crossway Christian Church",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 4,

    logo: null,

    website: null,
  },


  {
    name:
      "Trinitarian Congregational Church",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 10,

    logo: null,

    website: null,
  },


  {
    name: "Center for Family Connection",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 3,

    logo: null,

    website: null,
  },


  {
    name: "Free Christian Church",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 4,

    logo: null,

    website: null,
  },


  {
    name:
      "First Baptist Church of Weymouth",

    category:
      RELATIONSHIP_CATEGORY.UNCATEGORIZED,

    rank: 5,

    logo: null,

    website: null,
  },
];


/* =========================================================
   INITIALS FALLBACK

   Used if an organization does not have a logo yet.

   Examples:

   Boston College
   -> BC

   Aletheia Church
   -> AC

   First Baptist Church of Weymouth
   -> FB
========================================================= */

export function getRelationshipInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}