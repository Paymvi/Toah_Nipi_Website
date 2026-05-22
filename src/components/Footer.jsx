

export default function Footer() {
  return (
    <div className="footer-contact-grid">
      <div className="footer-contact-card">
        <p className="footer-label">Physical Address</p>
        <p>
          49 Fellowship Circle
          <br />
          Rindge, NH 03461
        </p>
      </div>

      <div className="footer-contact-card">
        <p className="footer-label">Mailing Address</p>
        <p>
          252 Old Ashburnham Road
          <br />
          Rindge, NH 03461
        </p>
      </div>

      <div className="footer-contact-card">
        <p className="footer-label">Phone</p>
        <p>
          <a href="tel:16038995464">(603) 899-5464</a>
        </p>
      </div>

      <div className="footer-contact-card">
        <p className="footer-label">Email</p>
        <p>
          <a href="mailto:contactus@toahnipi.org">contactus@toahnipi.org</a>
        </p>
      </div>
    </div>
  );
}