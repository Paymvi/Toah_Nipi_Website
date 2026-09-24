const newsPosts = [
  {
    id: 1,
    title: "Welcome to the Toah Nipi News",
    date: "September 24, 2026",
    category: "Camp Update",
    image: "/Apr-2026-Crowd.jpg",
    excerpt:
      "Stay connected with what is happening at Toah Nipi, from retreat stories and upcoming events to projects, improvements, and life around camp.",
  },

  {
    id: 2,
    title: "Looking Back on Family Camp 2026",
    date: "August 15, 2026",
    category: "Family Camp",
    image: "/Apr-2026-Crowd.jpg",
    excerpt:
      "A look back at another meaningful week of worship, community, outdoor adventure, and time together at Toah Nipi.",
  },

  {
    id: 3,
    title: "What's New Around Camp",
    date: "July 20, 2026",
    category: "Projects",
    image: "/Apr-2026-Crowd.jpg",
    excerpt:
      "See some of the projects, improvements, and behind-the-scenes work happening throughout the retreat center.",
  },
];


export default function News() {
  const featuredPost = newsPosts[0];
  const remainingPosts = newsPosts.slice(1);

  return (
    <main className="news-page">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="news-hero">
        <div className="news-hero-content">
          <span className="news-eyebrow">
            Stories from Toah Nipi
          </span>

          <h1>News</h1>

          <p>
            Updates, stories, projects, and moments from life
            around Toah Nipi.
          </p>
        </div>
      </section>


      {/* =====================================================
          FEATURED ARTICLE
      ===================================================== */}
      <section className="news-section">

        <div className="news-section-heading">
          <span>Latest Story</span>

          <h2>What's happening at Toah Nipi</h2>
        </div>


        <article className="news-featured">

          <div className="news-featured-image">
            <img
              src={featuredPost.image}
              alt=""
            />
          </div>


          <div className="news-featured-content">

            <div className="news-post-meta">
              <span className="news-category">
                {featuredPost.category}
              </span>

              <span>
                {featuredPost.date}
              </span>
            </div>


            <h3>
              {featuredPost.title}
            </h3>


            <p>
              {featuredPost.excerpt}
            </p>


            <button
              type="button"
              className="news-read-more"
            >
              Read Story
            </button>

          </div>

        </article>

      </section>


      {/* =====================================================
          MORE NEWS
      ===================================================== */}
      <section className="news-section news-more-section">

        <div className="news-section-heading">
          <span>From Around Camp</span>

          <h2>More Stories</h2>
        </div>


        <div className="news-grid">

          {remainingPosts.map((post) => (

            <article
              className="news-card"
              key={post.id}
            >

              <div className="news-card-image">
                <img
                  src={post.image}
                  alt=""
                />
              </div>


              <div className="news-card-content">

                <div className="news-post-meta">
                  <span className="news-category">
                    {post.category}
                  </span>

                  <span>
                    {post.date}
                  </span>
                </div>


                <h3>
                  {post.title}
                </h3>


                <p>
                  {post.excerpt}
                </p>


                <button
                  type="button"
                  className="news-card-link"
                >
                  Read Story →
                </button>

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>
  );
}