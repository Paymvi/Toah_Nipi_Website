import { useState } from "react";

const coreValues = [
  {
    title: "Holy Discontent",
    text: "As Christians, we recognize that we will always fall short of the perfection that is displayed in the example of the Messiah. Dwelling constantly in a state of self reflection with an attitude of improvement is essential for drawing closer to Christ each day. Toah Nipi strives to celebrate when Jesus is evident in our actions, all the while continuing to grow in Christ through reflection, curiosity, authenticity, accountability, personal sacrifice and professional development. Holding this mindset at an organizational level and also in the personal lives of our staff is essential to the environment that Toah Nipi wishes to embody. (Psalm 143)",
  },
  {
    title: "Hospitality",
    text: "In a space where individuals and groups come to find refuge and rest, providing a hospitable environment is crucial to guests feeling welcomed and at home. Often, in order for the spiritual needs of humans to be met, their physical needs must first be met. Going the extra mile, offering quality meals, a clean environment, and accommodation for additional group needs is part of the service Toah Nipi believes is Christlike and intrinsic to who Toah Nipi is as an organization. (Romans 12)",
  },
  {
    title: "Sustainability",
    text: "We believe that as an organization we have a responsibility to pursue efforts to increase sustainability in fulfillment of our calling as stewards of the Earth and servants to others. The ministry of Jesus was directed towards justice through relationships. In the pursuit of bettering the quality of life for all humans, increasing equity, promoting economic security for all, and bettering the environment, change can be most effectively enacted through building relationships and extending the love of Jesus to all people. Further, Jesus’ ministry was expansive—reaching all who were willing to hear—regardless of age, ethnicity, culture, social status, or gender. In a similar manner, Toah Nipi wishes to foster an inclusive environment that is welcoming to all groups across different ministries, organizations, denominations, churches, and cultures. (Micah 6:8 & Psalm 24:1) ",
  },
  {
    title: "Collegiate Focus",
    text: "Historically, Toah Nipi has belonged to Intervarsity Christian Fellowship as a space for campus retreats and student discipleship. As a result, Toah Nipi’s culture has been shaped—and will continue to be shaped—by students that enter through its doors. Toah Nipi will continue to provide Christ centered retreats for campus involved organizations, collaborating with campus ministries to facilitate life transforming experiences through the combination of the Gospel, creation, and fun. (John 17) ",
  },
];

export default function CoreValues() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleValue = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="core-values-section" id="core-values">
      <div className="core-values-inner reveal-group">
        <h2>Our Core Values</h2>

        <div className="core-values-accordion">
          {coreValues.map((value, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                className={`core-value-item ${isOpen ? "core-value-item-open" : ""}`}
                key={value.title}
              >
                <button
                  className="core-value-trigger"
                  type="button"
                  onClick={() => toggleValue(index)}
                  aria-expanded={isOpen}
                >
                  <span>{value.title}</span>
                  <span className="core-value-icon">{isOpen ? "−" : "+"}</span>
                </button>

                <div className="core-value-panel">
                  <div className="core-value-content">
                    <p>{value.text}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}