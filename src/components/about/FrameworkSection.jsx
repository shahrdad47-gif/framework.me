import Image from 'next/image'

const expressions = [
  {
    num: '01', icon: '⛪', title: 'The Church', sub: 'Preparing the Bride of Christ',
    body: "God is perfecting His global Church — raising up a Bride who is lovesick, holy, and ready for the return of the King.",
  },
  {
    num: '02', icon: '✡️', title: 'Israel', sub: "God's Covenant",
    body: "The irrevocable covenants of God with Israel remain central to His plan — the restoration of Israel is the linchpin of end-time prophecy.",
  },
  {
    num: '03', icon: '🌍', title: 'Missions', sub: 'Fulfilling the Great Commission',
    body: "The Gospel must be proclaimed to every tribe, tongue, and nation — particularly to the unreached peoples of the Middle East and beyond.",
  },
  {
    num: '04', icon: '⌛', title: 'End Times', sub: 'Judgment of Nations',
    body: "The Scriptures reveal God's plan for the nations in the last days — a great shaking and realignment as history moves toward its appointed end.",
  },
  {
    num: '05', icon: '🙏', title: 'House of Prayer', sub: 'Establishing the Dwelling Place of God',
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
          {expressions.map(e => (
            <div key={e.num} className="expr-card">
              <div className="expr-number">{e.num}</div>
              <div className="expr-icon">{e.icon}</div>
              <h3>{e.title}</h3>
              <span className="expr-sub">{e.sub}</span>
              <p>{e.body}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
