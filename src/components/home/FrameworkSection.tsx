import Image from 'next/image'

const ChurchIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="22" y2="11"/>
    <line x1="17" y1="6.5" x2="27" y2="6.5"/>
    <polyline points="4,22 22,8 40,22"/>
    <rect x="4" y="22" width="36" height="20"/>
    <rect x="16" y="30" width="12" height="12"/>
  </svg>
)

const IsraelIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22,4 34,24 10,24"/>
    <polygon points="22,40 10,20 34,20"/>
  </svg>
)

const MissionsIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="22" cy="10" r="4"/>
    <path d="M14 30v-6a8 8 0 0 1 16 0v6"/>
    <circle cx="8" cy="14" r="3"/>
    <path d="M2 30v-4a6 6 0 0 1 9.5-4.9"/>
    <circle cx="36" cy="14" r="3"/>
    <path d="M42 30v-4a6 6 0 0 0-9.5-4.9"/>
    <path d="M4 42h36"/>
  </svg>
)

const EndTimesIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 4h24M10 40h24"/>
    <path d="M13 4c0 10 18 14 18 18S13 30 13 40"/>
    <path d="M31 4c0 10-18 14-18 18s18 10 18 18"/>
    <line x1="10" y1="22" x2="34" y2="22"/>
  </svg>
)

const HousePrayerIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4,22 22,6 40,22"/>
    <path d="M8 22v18h28V22"/>
    <line x1="22" y1="13" x2="22" y2="21"/>
    <line x1="18" y1="17" x2="26" y2="17"/>
    <rect x="17" y="30" width="10" height="10"/>
  </svg>
)

const expressions = [
  {
    num: '01', Icon: ChurchIcon, title: 'The Church', sub: 'Preparing the Bride of Christ',
    body: "God is perfecting His global Church — raising up a Bride who is lovesick, holy, and ready for the return of the King.",
  },
  {
    num: '02', Icon: IsraelIcon, title: 'Israel', sub: "God's Covenant",
    body: "The irrevocable covenants of God with Israel to the budding fig tree of end-time prophecy, Israel stands at the fulcrum of all prophetic history.",
  },
  {
    num: '03', Icon: MissionsIcon, title: 'Missions', sub: 'Fulfilling the Great Commission',
    body: "The Gospel must be proclaimed to every tribe, tongue, and nation — particularly to the unreached peoples of the Middle East and beyond.",
  },
  {
    num: '04', Icon: EndTimesIcon, title: 'End Times', sub: 'Judgment of Nations',
    body: "The Scriptures reveal God's plan for the nations in the last days — a great shaking and realignment as history moves toward its appointed end.",
  },
  {
    num: '05', Icon: HousePrayerIcon, title: 'House of Prayer', sub: 'Establishing the Dwelling Place of God',
    body: "God is raising up 24/7 houses of prayer across the nations — the foundation of intercession that will sustain the global harvest and escort Christ's return.",
  },
]

export default function FrameworkSection() {
  return (
    <div className="framework-section">
      <div className="container">

        <div className="framework-intro">
          <h2 className="section-heading centered">Our Framework of Understanding</h2>
          <div className="gold-rule centered"></div>
          <p className="framework-lead">
            God&apos;s administration for the ages is to sum up everything in Christ Jesus — to bring heaven
            and earth together again. The Kingdom of God is continually increasing until Jesus returns to bring
            justice and righteousness on the earth. God is aligning the nations and preparing the global Church
            to walk victoriously through the unique dynamics ahead until Christ is formed within her.
          </p>
          <p className="framework-sub">
            There are many important movements of God through the nations, but we believe these are{' '}
            <strong>5 key expressions of God&apos;s heart</strong> that will mature and converge together
            to bring redemptive history to its glorious culmination.
          </p>
        </div>

        <div className="diagram-wrap">
          <Image
            src="/images/framework-diagram.png"
            alt="God's Plan — The 5 Movements Diagram"
            width={540}
            height={440}
            className="diagram-img"
            priority
          />
        </div>

        <div className="expressions-grid">
          {expressions.map(({ num, Icon, title, sub, body }) => (
            <div key={num} className="expr-card">
              <div className="expr-number">{num}</div>
              <div className="expr-icon"><Icon /></div>
              <h3>{title}</h3>
              <span className="expr-sub">{sub}</span>
              <p>{body}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
