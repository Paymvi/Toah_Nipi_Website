import { Link } from "react-router-dom";
import SiteFooter from "../components/SiteFooter";
import SEO from "../components/SEO";

export default function Privacy() {
  return (
    <main className="policy-page">
      <SEO
        title="Privacy Notice"
        description="How the Toah Nipi Christian Retreat Center website collects, uses, and shares information."
        path="/privacy"
      />

      <article className="policy-content">
        <header className="policy-header">
          <p className="policy-eyebrow">Toah Nipi Christian Retreat Center</p>
          <h1>Privacy Notice</h1>
          <p className="policy-updated">Last updated: October 2026</p>
          <p>
            This notice explains what information this website collects, how we
            use it, and who helps us handle it. It covers this website only.
          </p>
        </header>

        <section>
          <h2>Information We Collect</h2>

          <h3>Information you send us</h3>
          <ul>
            <li>
              <strong>Contact form.</strong> Your name and email address, and
              anything else you choose to include: phone number, group size,
              desired dates, church or ministry name and address, type of
              retreat, how you heard about us, promo code, and your message.
              The form also adds an inquiry reference number, the time it was
              sent, and the address of the page it was sent from.
            </li>
            <li>
              <strong>Newsletter signup.</strong> Your first name, last name,
              and email address.
            </li>
            <li>
              <strong>Email and phone.</strong> Anything you send us directly,
              such as a prayer request or a question.
            </li>
          </ul>

          <h3>Information collected automatically</h3>
          <p>
            When you visit, our website host and analytics service receive
            standard technical information, such as the pages you view, the
            site that referred you, your browser and device type, and your
            approximate location. See <a href="#analytics">Analytics</a> below.
          </p>
        </section>

        <section>
          <h2>How We Use Information</h2>
          <ul>
            <li>To respond to your questions and help plan your visit or retreat.</li>
            <li>To send our newsletter, if you signed up for it.</li>
            <li>To understand how the website is used so we can improve it.</li>
            <li>To keep the website working and secure.</li>
          </ul>
        </section>

        <section>
          <h2>Service Providers and Third Parties</h2>
          <p>
            We use a few outside services to run this website. They receive
            information only as needed to provide their service to us.
          </p>
          <ul>
            <li>
              <strong>FormSubmit</strong> (formsubmit.co) receives contact form
              and newsletter submissions and delivers them to Toah Nipi by
              email. Contact form submissions are sent to our main inbox, and a
              copy is sent to a second email account used to keep a record of
              inquiries.
            </li>
            <li>
              <strong>Vercel</strong> hosts this website and provides our
              analytics.
            </li>
            <li>
              <strong>Google</strong> supplies some of the organization logos
              shown on our Support page. When that page loads, your browser
              requests those images from Google, so Google receives standard
              technical information such as your IP address.
            </li>
            <li>
              <strong>Our newsletter service.</strong> Our recent newsletters
              were sent using Flodesk.
            </li>
          </ul>
        </section>

        <section id="analytics">
          <h2>Analytics</h2>
          <p>
            We use Vercel Web Analytics to see how many people visit and which
            pages they view. It records information such as the page visited,
            the referring site, browser and operating system, device type, and
            approximate location. Vercel states that its Web Analytics does not
            use third-party cookies and identifies visits using a temporary
            value that is discarded after 24 hours. We view this information
            in summary form.
          </p>
          <p>
            We do not use advertising cookies or advertising trackers on this
            website.
          </p>
        </section>

        <section>
          <h2>Data Retention</h2>
          <p>
            We keep the information you send us for as long as we reasonably
            need it for the purposes described above. If you would like us to
            remove information you have sent us, or to take you off our
            newsletter list, please contact us.
          </p>
        </section>

        <section>
          <h2>Security</h2>
          <p>
            This website uses an encrypted (HTTPS) connection. No website or
            email system is completely secure, so please don’t send sensitive
            information, such as medical, financial, or government ID
            details, through our contact form or by email.
          </p>
        </section>

        <section>
          <h2>Children’s Privacy</h2>
          <p>
            This website is intended for adults. We do not knowingly collect
            personal information directly from children under 13 through this
            website. Family Camp registration takes place on a separate
            registration form intended to be completed by a parent or guardian.
            If you believe a child has sent us personal information through
            this website, please contact us so we can delete it.
          </p>
        </section>

        <section>
          <h2>Links to Other Websites</h2>
          <p>
            Our website links to services run by other organizations, including
            event registration forms (hosted by Tally), online donation pages,
            social media, Google Maps, our newsletter archive, and downloadable
            documents. Those services have their own privacy practices, and
            this notice does not cover them. Please review their privacy
            policies before sharing information with them.
          </p>
        </section>

        <section>
          <h2>Changes to This Notice</h2>
          <p>
            We may update this notice when our website or practices change. The
            date at the top of this page shows when it was last updated.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>
            If you have questions about this notice or about information you
            have sent us, please reach out:
          </p>
          <address className="policy-contact">
            Toah Nipi Christian Retreat Center
            <br />
            252 Old Ashburnham Road, Rindge, NH 03461
            <br />
            <a href="mailto:contactus@toahnipi.org">contactus@toahnipi.org</a>
            <br />
            <a href="tel:16038995464">603-899-5464</a>
          </address>
          <p>
            See also our <Link to="/accessibility">Accessibility Statement</Link>.
          </p>
        </section>
      </article>

      <SiteFooter />
    </main>
  );
}
