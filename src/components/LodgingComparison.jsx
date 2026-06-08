const lodgingOptions = [
  {
    id: "hebron",
    name: "Hebron",
    label: "Main Lodge",
    bestFor:
      "Large overnight retreats that need shared lodging and a central gathering space.",
    sleeps: "66",
    bathrooms: "Dorm bathrooms + showers",
    meetingSpace: "Up to 200",
    highlights: ["Bunk-style dormitories", "5 private rooms", "Large meeting space"],
  },
  {
    id: "bethel",
    name: "Bethel",
    label: "Family Style",
    bestFor:
      "Large groups and families that benefit from private bathrooms and shared gathering space.",
    sleeps: "72",
    bathrooms: "Private bathrooms",
    meetingSpace: "Several rooms",
    highlights: ["10 family-style bedrooms", "Lake views", "Kitchenette", "Open fireplace"],
  },
  {
    id: "dothan",
    name: "Dothan",
    label: "Small Groups",
    bestFor:
      "Smaller groups looking for a pond-side lodge with common space and meeting space.",
    sleeps: "22",
    bathrooms: "Two common bathrooms",
    meetingSpace: "20–30 people",
    highlights: ["Pond-side setting", "6 bedrooms", "Shared common space"],
  },
  {
    id: "guest-house",
    name: "Guest House",
    label: "Private Stay",
    bestFor:
      "Sabbaticals, furloughs, church leader retreats, board retreats, and small gatherings.",
    sleeps: "Up to 12",
    bathrooms: "Bathroom details not listed",
    meetingSpace: "Meeting spaces",
    highlights: ["Full kitchen", "Dining room", "Living room", "Library"],
  },
  {
    id: "rustic-cottages",
    name: "Rustic Cottages",
    label: "Quiet Retreat",
    bestFor:
      "Personal retreats, prayer, solitude, families, and small groups seeking a simpler stay.",
    sleeps: "3–8",
    bathrooms: "Bathroom details not listed",
    meetingSpace: "Varies by cottage",
    highlights: ["Independent cottages", "Unique layouts", "Quiet private stay"],
  },
];

export default function LodgingComparison() {
  return (
    <section className="lodging-comparison-section" id="lodging-comparison">
      <div className="lodging-comparison-header reveal-group">
        <p className="lodging-comparison-eyebrow">Compare lodging</p>

        <h2>Find the right space for your group.</h2>

        <p>
          A simple overview of each lodging option before you explore the full
          photos and details below.
        </p>
      </div>

      <div className="lodging-comparison-table-wrap reveal-group">
        <table className="lodging-comparison-table">
          <thead>
            <tr>
              <th>Space</th>
              <th>Best For</th>
              <th>Sleeps</th>
              <th>Bathrooms</th>
              <th>Meeting Space</th>
              <th>Highlights</th>
              <th>
                <span className="sr-only">View lodging details</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {lodgingOptions.map((option) => (
              <tr key={option.id}>
                <td className="lodging-comparison-name-cell">
                  <strong>{option.name}</strong>
                  <span>{option.label}</span>
                </td>

                <td className="lodging-comparison-best-for">
                  {option.bestFor}
                </td>

                <td>
                  <span className="lodging-comparison-sleeps">
                    {option.sleeps}
                  </span>
                </td>

                <td>{option.bathrooms}</td>

                <td>{option.meetingSpace}</td>

                <td>
                  <div className="lodging-comparison-tags">
                    {option.highlights.map((highlight) => (
                      <span key={highlight}>{highlight}</span>
                    ))}
                  </div>
                </td>

                <td className="lodging-comparison-action-cell">
                  <a
                    href={`#${option.id}`}
                    className="lodging-comparison-link"
                  >
                    View <span aria-hidden="true">→</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="lodging-comparison-note">
        Not sure which space fits best? Contact us and we’ll help match your
        group with the right lodging option.
      </p>
    </section>
  );
}