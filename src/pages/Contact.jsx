import { useState } from "react";

const retreatTypes = [
  "Church Retreat",
  "Student Retreat",
  "Family Retreat",
  "Personal Retreat",
  "Leadership Retreat",
  "Day Visit",
  "Conference",
  "Other",
];

const initialFormState = {
  name: "",
  groupSize: "",
  desiredDates: "",
  email: "",
  phone: "",
  churchOrMinistry: "",
  retreatType: "",
  promoCode: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent("Retreat Inquiry from Toah Nipi Website");

    const body = encodeURIComponent(`
Name: ${formData.name}
Group Size: ${formData.groupSize}
Desired Dates: ${formData.desiredDates}
Email: ${formData.email}
Phone: +1 ${formData.phone}
Church or Ministry: ${formData.churchOrMinistry}
Type of Retreat: ${formData.retreatType}
Promo Code: ${formData.promoCode || "N/A"}

Message:
${formData.message}
    `);

    window.location.href = `mailto:contactus@toahnipi.org?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-overlay" />

        <div className="contact-hero-content">
          <p className="contact-eyebrow contact-eyebrow-light">Contact Us</p>

          <h1>
            Let’s start planning your time at{" "}
            <span>Toah Nipi.</span>
          </h1>

          <p>
            Whether you are planning a retreat, asking about availability, or
            simply looking for more information, our team would love to help you
            take the next step.
          </p>
        </div>
      </section>

      <section className="contact-main-section" id="contact-form">
        <div className="contact-info-column">
          <div className="contact-info-heading">
            <p className="contact-eyebrow">Toah Nipi Christian Retreat Center</p>
            <h2>We’re here to help you plan.</h2>
            <p>
              Send us a note with your group details and desired dates. Someone
              from the Toah Nipi team will follow up with you.
            </p>
          </div>

          <div className="contact-card-grid">
            <article className="contact-info-card">
              <span>01</span>
              <div>
                <h3>Physical Address</h3>
                <p>
                  49 Fellowship Circle
                  <br />
                  Rindge, NH 03461
                </p>
              </div>
            </article>

            <article className="contact-info-card">
              <span>02</span>
              <div>
                <h3>Mailing Address</h3>
                <p>
                  252 Old Ashburnham Road
                  <br />
                  Rindge, NH 03461
                </p>
              </div>
            </article>

            <article className="contact-info-card contact-info-card-wide">
              <span>03</span>
              <div>
                <h3>Contact</h3>

                <div className="contact-link-row">
                  <a href="tel:16038995464">603-899-5464</a>
                  <a href="mailto:contactus@toahnipi.org">
                    contactus@toahnipi.org
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div className="contact-image-card">
            <img
              src="/Dothan-Porch.webp"
              alt="A welcoming porch at Toah Nipi"
            />

            <div className="contact-image-note">
              <span>Planning a retreat?</span>
              <p>
                Tell us about your group size, dates, and retreat goals. We’ll
                help you think through lodging, meals, meeting spaces, and time
                outdoors.
              </p>
            </div>
          </div>
        </div>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <div className="contact-form-header">
            <p className="contact-eyebrow">Retreat Inquiry</p>
            <h2>Send us a message</h2>
          </div>

          <div className="contact-form-grid">
            <label>
              Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Group Size
              <input
                type="number"
                name="groupSize"
                min="1"
                value={formData.groupSize}
                onChange={handleChange}
              />
            </label>

            <label>
              Desired Dates
              <input
                type="text"
                name="desiredDates"
                placeholder="Example: June 12–15"
                value={formData.desiredDates}
                onChange={handleChange}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone
              <div className="phone-input-wrap">
                <span>+1</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </label>

            <label>
              Type of Retreat
              <select
                name="retreatType"
                value={formData.retreatType}
                onChange={handleChange}
              >
                <option value="">Select an option</option>

                {retreatTypes.map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>

            <label className="contact-form-full">
              Name & Address of Church or Ministry
              <input
                type="text"
                name="churchOrMinistry"
                value={formData.churchOrMinistry}
                onChange={handleChange}
              />
            </label>

            <label className="contact-form-full">
              Promo Code
              <input
                type="text"
                name="promoCode"
                placeholder="If applicable"
                value={formData.promoCode}
                onChange={handleChange}
              />
            </label>

            <label className="contact-form-full">
              Message
              <textarea
                name="message"
                rows="7"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button type="submit" className="contact-submit-button">
            Send Message
          </button>

          <p className="contact-form-note">
            This will open your email app with the message prepared for
            contactus@toahnipi.org.
          </p>
        </form>
      </section>

      <section className="contact-directions-section" id="directions">
        <div className="contact-directions-card">
          <p className="contact-eyebrow contact-eyebrow-light">Directions</p>

          <h2>Find us in Rindge, New Hampshire.</h2>

          <p>
            Toah Nipi Christian Retreat Center is located at 49 Fellowship
            Circle in Rindge, NH. Guests can use the physical address for GPS
            directions.
          </p>

          <a
            href="https://www.google.com/maps/search/?api=1&query=49+Fellowship+Circle+Rindge+NH+03461"
            target="_blank"
            rel="noreferrer"
            className="contact-directions-button"
          >
            Open in Google Maps <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}