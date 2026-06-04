export default function GiveSection() {
  return (
    <section className="give-section">
      <div className="give-bg" />
      <div className="container give-inner">

        <div className="give-text-col">
          <p className="give-eyebrow">Partner With Us</p>
          <h2 className="give-title">Support the Work<br />of Framework:ME</h2>
          <div className="give-gold-rule" />
          <p className="give-desc">
            Framework:ME is a free teaching and resource library for the global Church.
            Every article, teaching, and resource is freely available because of the
            generosity of people who believe in this mission.
          </p>
          <ul className="give-reasons">
            <li>
              <span className="give-reason-icon">📖</span>
              <div>
                <strong>Free Biblical Resources</strong>
                <span>Teaching articles, video teachings, and study notes at no cost</span>
              </div>
            </li>
            <li>
              <span className="give-reason-icon">🌍</span>
              <div>
                <strong>Reaching the Nations</strong>
                <span>Preparing the global Church for the return of Christ</span>
              </div>
            </li>
            <li>
              <span className="give-reason-icon">🙏</span>
              <div>
                <strong>Intercession &amp; Prayer</strong>
                <span>Sustaining prayer for Israel, the Middle East, and the nations</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="give-card-col">
          <div className="give-card">
            <div className="give-card-top">
              <div className="give-card-icon">♥</div>
              <h3>Monthly Support</h3>
              <p>Join as a monthly partner and help sustain this ministry long-term.</p>
            </div>
            <div className="give-card-body">
              <a
                href="https://www.zeffy.com/en-US/donation-form/lee-family-monthly-support"
                target="_blank"
                rel="noopener noreferrer"
                className="give-btn-main"
              >
                Give Monthly
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <p className="give-secure-note">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Secure giving via Zeffy — 100% goes to the ministry
              </p>
            </div>
            <div className="give-card-footer">
              <p>Questions? <a href="mailto:frameworkmenaca@gmail.com">Contact us</a></p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
