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

   NOTE ABOUT REMOTE LOGOS:
   For organizations that do not yet have a local logo file,
   the logo field uses Google's site-icon service as a temporary
   remote brand image. These can be replaced later with local
   PNG/SVG/WebP files in /public/partner-logos/.
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
    category: RELATIONSHIP_CATEGORY.MINISTRY,
    rank: 10,
    logo: "/partner-logos/InterVarsity.webp",
    logoBackground: "#ffffff",
    website: "https://intervarsity.org/",
  },

  {
    name: "A Rocha USA",
    category: RELATIONSHIP_CATEGORY.MINISTRY,
    rank: 1,
    logo: "/partner-logos/A-Rocha-2.png",
    logoBackground: "#ffffff",
    website: "https://arocha.org/en/",
  },

  {
    name: "Sattler University",
    category: RELATIONSHIP_CATEGORY.MINISTRY,
    rank: 7,
    logo: "/partner-logos/Sattler.png",
    logoBackground: "#ffffff",
    website: "https://sattler.edu/",
  },


  /* =======================================================
     RETURNING RETREAT GROUPS
  ======================================================= */

  {
    name: "Antioch Church",
    category: RELATIONSHIP_CATEGORY.RETREAT,
    rank: 9,
    logo: "/partner-logos/Antioch-Church-2.png",
    logoBackground: "#ffffff",
    website: null,
  },


  /* =======================================================
     CATEGORY STILL NEEDS TO BE ASSIGNED
  ======================================================= */

  {
    name: "Boston College",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 8,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.bc.edu&sz=256",
    logoBackground: "#862020",
    website: "https://www.bc.edu/",
  },

  {
    name: "Assembly of God Mission Ministry",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 8,

    /*
      Temporary denomination-level mark.
      The exact ministry represented by this relationship
      should still be confirmed before assigning its final
      website/logo.
    */
    logo: "https://www.google.com/s2/favicons?domain_url=https://ag.org&sz=256",
    logoBackground: "#ffffff",
    website: null,
  },

  {
    name: "New England Church Planting Network",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 2,
    logo: "https://www.google.com/s2/favicons?domain_url=https://necpn.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://necpn.org/",
  },

  {
    name: "First Baptist Church of Yarmouth",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 2,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.firstbaptistyarmouth.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.firstbaptistyarmouth.org/",
  },

  {
    name: "Redemptoris Mater Seminary",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 1,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.rmsboston.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.rmsboston.org/",
  },

  {
    name: "First Baptist Church of Sudbury",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 3,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.fbcsudbury.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.fbcsudbury.org/",
  },

  {
    name: "Academy of Notre Dame",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 3,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.ndatyngsboro.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.ndatyngsboro.org/",
  },

  {
    name: "Congregation Lion of Judah",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 2,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.leondejuda.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.leondejuda.org/",
  },

  {
    name: "NewCity Church",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 2,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.newcitychurch.cc&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.newcitychurch.cc/",
  },

  {
    name: "The Garden Church-Boston",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 3,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.thegardenboston.com&sz=256",
    logoBackground: "#163613",
    website: "https://www.thegardenboston.com/",
  },

  {
    name: "Providence Hmong",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 4,

    /*
      Providence Hmong Alliance Church is listed by
      the Hmong District. This uses the district mark
      until a dedicated local logo/site is available.
    */
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.hmongdistrict.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.hmongdistrict.org/area-08-1",
  },

  {
    name: "Resurrection Church-East Boston",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 4,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.resurrectionbos.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.resurrectionbos.org/",
  },

  {
    name: "Boston Chinese Evangelical Church",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 3,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.bcec.net&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.bcec.net/",
  },

  {
    name: "Longwood/Boston Healthcare Fellowship",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 6,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.healthcarefellowship.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.healthcarefellowship.org/",
  },

  {
    name: "Beacon Church",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 1,

    /*
      This currently points to Beacon Church in Derry, NH.
      Confirm this is the Beacon relationship Toah Nipi means.
    */
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.beaconnh.com&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.beaconnh.com/",
  },

  {
    name: "Harvard University",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 8,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.harvard.edu&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.harvard.edu/",
  },

  {
    name: "Aletheia Church",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 8,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.aletheia.org&sz=256",
    logoBackground: "#242638",
    website: "https://www.aletheia.org/",
  },

  {
    name: "Crossway Christian Church",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 4,
    logo: "https://www.google.com/s2/favicons?domain_url=https://crosswaycc.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://crosswaycc.org/",
  },

  {
    name: "Trinitarian Congregational Church",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 10,

    /*
      Toah Nipi's own history identifies this relationship
      as Trinitarian Congregational Church of Wayland, MA.
    */
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.tccwayland.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.tccwayland.org/",
  },

  {
    name: "Center for Family Connection",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 3,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.centerforfamilyconnection.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.centerforfamilyconnection.org/",
  },

  {
    name: "Free Christian Church",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 4,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.freechristian.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.freechristian.org/",
  },

  {
    name: "First Baptist Church of Weymouth",
    category: RELATIONSHIP_CATEGORY.UNCATEGORIZED,
    rank: 5,
    logo: "https://www.google.com/s2/favicons?domain_url=https://www.fbcweymouth.org&sz=256",
    logoBackground: "#ffffff",
    website: "https://www.fbcweymouth.org/",
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