import { useState } from "react";
import { FaMapMarkerAlt, FaRegEnvelope, FaPhoneAlt } from "react-icons/fa";
import SiteFooter from "../components/SiteFooter";
import SEO from "../components/SEO";


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
  heardAboutUs: "",
  promoCode: "",
  message: "",
};

const referralSources = [
  "Google Search",
  "Social Media",
  "Friend/Family recommendation",
  "Pastor/Church recommendation",
  "Past guest with my Church",
  "Past guest with Family Camp",
  "Past guest with IV Chapter",
  "Other",
];

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
How Did You Hear About Us: ${formData.heardAboutUs || "N/A"}
Promo Code: ${formData.promoCode || "N/A"}

Message:
${formData.message}
    `);

    window.location.href = `mailto:contactus@toahnipi.org?subject=${subject}&body=${body}`;
  };

  return (
    <main className="contact-page">

      <SEO
        title="Contact Toah Nipi"
        description="Contact Toah Nipi Christian Retreat Center to plan a retreat, ask about availability, or get directions to Rindge, New Hampshire."
        path="/contact"
      />

      <section className="contact-hero">
        <div className="contact-hero-overlay" />

        <div className="contact-hero-content reveal-group">
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
        <div className="contact-info-column reveal-group">
          <div className="contact-info-heading">
            <p className="contact-eyebrow">Toah Nipi Christian Retreat Center</p>
            <h2>Here to help you plan</h2>
            <p>
              Send us a note with your group details and desired dates. Someone
              from the Toah Nipi team will follow up with you.
            </p>
          </div>

          <div className="contact-card-grid">
          <article className="contact-info-card">
            <span className="contact-info-icon" aria-hidden="true">
              <FaMapMarkerAlt />
            </span>

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
            <span className="contact-info-icon" aria-hidden="true">
              <FaRegEnvelope />
            </span>

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
            <span className="contact-info-icon" aria-hidden="true">
              <FaPhoneAlt />
            </span>

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
              src="/Toah-Nipi-Map.webp"
              alt="Map showing Toah Nipi's location in New England"
            />

            <div className="contact-image-note">
              {/* <span>Planning a retreat?</span> */}
              <p>
                Located in Rindge, NH, Toah Nipi offers a peaceful retreat setting within
  reach of the wider New England region.  
              </p>
            </div> 
          </div>
        </div>

        <form className="contact-form-card reveal-group" onSubmit={handleSubmit}>
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
              Group Size (estimate)
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
              How did you hear about us?
              <select
                name="heardAboutUs"
                value={formData.heardAboutUs}
                onChange={handleChange}
              >
                <option value="">Select an option</option>

                {referralSources.map((source) => (
                  <option value={source} key={source}>
                    {source}
                  </option>
                ))}
              </select>
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

      <section className="contact-join-team-section" id="join-our-team">
        <div className="contact-join-team-inner reveal-group">
          <div className="contact-join-team-copy">
            <p className="contact-join-team-eyebrow">Serve with us</p>

            <h2>Interested in joining our team?</h2>

            <p className="contact-join-team-text">
              Toah Nipi relies on summer crew, volunteers, full-time staff, and
              part-time employees to help serve guests year-round.
            </p>

            <div className="contact-join-team-tags" aria-label="Ways to serve">
              <span>Summer crew</span>
              <span>Volunteers</span>
              <span>Full-time</span>
              <span>Part-time</span>
            </div>
          </div>

          <div className="contact-join-team-card">
            <p className="contact-join-team-card-label">Application</p>

            <h3>Ready to take the next step?</h3>

            <p>
              Download the application, fill it out, and email it back to our team
            </p>

            <a
              href="https://static1.squarespace.com/static/655e2edd0f7abd1c10a73d3b/t/667af7bbcee58e137d601f55/1719334843850/RTC+Application+Blank+%281%29.pdf"
              target="_blank"
              rel="noreferrer"
              className="contact-join-team-button"
            >
              Download Application <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="contact-directions-hero" id="directions">
        <div className="contact-directions-content reveal-group">
          <p className="contact-directions-eyebrow">Directions</p>

          <h2>Find us in Rindge, New Hampshire.</h2>

          <p className="contact-directions-copy">
            Toah Nipi Christian Retreat Center is located at
            <br />
            <strong>49 Fellowship Circle in Rindge, NH.</strong>
            <br />
            Guests can use the physical address for GPS directions.
          </p>

          <a
            className="contact-directions-button"
            href="https://www.google.com/maps/search/?api=1&query=49%20Fellowship%20Circle%20Rindge%20NH"
            target="_blank"
            rel="noreferrer"
          >
            Open in Google Maps <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <SiteFooter/>

    </main>
  );
}