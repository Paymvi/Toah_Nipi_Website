

const faithItems = [
  "The only true God, the almighty Creator of all things, existing eternally in three persons—Father, Son, and Holy Spirit—full of love and glory.",
  "The unique divine inspiration, entire trustworthiness, and authority of the Bible.",
  "The value and dignity of all people: created in God's image to live in love and holiness, but alienated from God and each other because of our sin and guilt, and justly subject to God’s wrath.",
  "Jesus Christ, fully human and fully divine, who lived as a perfect example, who assumed the judgment due sinners by dying in our place, and who was bodily raised from the dead and ascended as Savior and Lord.",
  "Justification by God's grace to all who repent and put their faith in Jesus Christ alone for salvation.",
  "The indwelling presence and transforming power of the Holy Spirit, who gives to all believers a new life and a new calling to obedient service.",
  "The unity of all believers in Jesus Christ, manifest in worshiping and witnessing churches making disciples throughout the world.",
  "The victorious reign and future personal return of Jesus Christ, who will judge all people with justice and mercy, giving over the unrepentant to eternal condemnation but receiving the redeemed into eternal life.",
];

export default function StatementOfFaith() {
  return (
    <section className="statement-faith-section" id="statement-of-faith">
      <div className="statement-faith-inner">
        <div className="statement-faith-copy">
          <p className="statement-faith-eyebrow">What We Believe</p>

          <h2>Our Statement of Faith</h2>

          <p>
            At the heart of Toah Nipi is a Christian vision for renewal,
            discipleship, hospitality, and worship. These beliefs shape how we
            steward this place and welcome guests.
          </p>
        </div>

        <div className="statement-faith-list">
          <p className="statement-faith-intro">We believe in:</p>

          {faithItems.map((item, index) => (
            <article className="statement-faith-card" key={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          ))}

          <div className="statement-faith-closing">
            <p>To God be glory forever.</p>
          </div>
        </div>
      </div>
    </section>
  );
}