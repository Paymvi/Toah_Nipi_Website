import lodgingFaq from "../data/lodgingFaq";

// Answers sit in native <details> elements, so the text stays in the page
// (and readable by search engines) while collapsed.
export default function LodgingFaq() {
  if (lodgingFaq.length === 0) {
    return null;
  }

  return (
    <section className="lodging-faq-section" id="planning">
      <div className="lodging-faq-inner">
        <p className="lodging-comparison-eyebrow">Planning your retreat</p>

        <h2>Common questions</h2>

        <div className="lodging-faq-list">
          {lodgingFaq.map(({ question, answer }) => (
            <details className="lodging-faq-item" key={question}>
              <summary>
                <span>{question}</span>
                <span className="lodging-faq-icon" aria-hidden="true" />
              </summary>

              <div className="lodging-faq-answer">
                {[].concat(answer).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
