import { useState } from 'react';

declare global { interface Window { posthog?: { capture: (event: string, props?: Record<string, unknown>) => void; identify: (id: string, props?: Record<string, unknown>) => void; }; } }

const personas = [
  {
    id: 'vp-sales',
    label: 'VP of Sales',
    role: 'Pipeline Oversight',
    pain: "You review 40 deals a week. You only truly understand 8 of them.",
    stops: [
      'Weekly pipeline review meetings with no new answers',
      'Chasing reps for deal status before every forecast call',
      'Building forecast confidence on spreadsheets and gut feel',
      'Finding out a deal was lost after it was already gone',
    ],
    gets: [
      'Top 5 at-risk deals ranked by urgency, every morning',
      'Auto-generated deal context without asking a single rep',
      'Coaching flags: who needs your attention and why',
      'Forecast delta vs last week with signal-backed reasoning',
    ],
    metric: { num: '3.2h', label: 'saved per manager per week', sub: 'On pipeline review, forecast prep, and status calls' },
    brief: ['4 deals need intervention this week', '₹1.8Cr at risk - 2 going cold', 'Forecast up ₹42L from last week'],
  },
  {
    id: 'revops',
    label: 'RevOps',
    role: 'Data & Forecast Accuracy',
    pain: "Your CRM data is always 3 days out of date. Your forecast is built on what reps remembered to log.",
    stops: [
      'Manual data hygiene checks before every QBR',
      'Chasing reps to update close dates and next steps',
      'Building forecast models on incomplete CRM data',
      'Discovering data gaps only when it\'s too late',
    ],
    gets: [
      'Real-time signal coverage score per deal',
      'Auto-flagged CRM gaps: missing next step, silent deals, stale dates',
      'Forecast built from CRM + call + email - not rep memory',
      'Data quality trend report, updated in real-time',
    ],
    metric: { num: '67%', label: 'reduction in forecast prep time', sub: 'From 4.5h to 1.5h per forecast cycle on average' },
    brief: ['11 deals missing next step', '3 close dates overdue by 7+ days', 'CRM data freshness: 94% this week'],
  },
  {
    id: 'sales-manager',
    label: 'Sales Manager',
    role: 'Rep Coaching & Execution',
    pain: "You're coaching blind. You join calls you weren't on. You ask reps what happened.",
    stops: [
      'Listening to full call recordings to find one coaching moment',
      'Asking reps to recap their own deals in 1:1s',
      'Guessing who needs coaching and who doesn\'t',
      'Discovering missed commitments only when the deal slips',
    ],
    gets: [
      'Weekly rep scorecards - talk ratio, commitment rate, objection patterns',
      'Auto-extracted coaching moments from every call',
      'Commitment tracking: what each rep owes each prospect',
      'Deal health per rep, ranked by urgency every morning',
    ],
    metric: { num: '4×', label: 'more deals coached per week', sub: 'Without adding time to 1:1s or listening to recordings' },
    brief: ['Rohit: 3 overdue commitments', 'Kavya: talk ratio 78% - flag for coaching', '2 deals stalled 8+ days on your team'],
  },
  {
    id: 'ae',
    label: 'Account Executive',
    role: 'Deal Execution',
    pain: "You walk into calls without knowing what you promised last time or what they care about.",
    stops: [
      'Re-reading 3 months of email threads before a call',
      'Forgetting what you committed to on the last call',
      'Losing deals to "went dark" you could have prevented',
      'Manual prep that takes 20 min and still misses things',
    ],
    gets: [
      '60-second deal brief before every call, auto-generated',
      'Commitment tracker: what you owe, by when',
      'Prospect sentiment trend - are they warming or cooling?',
      'Suggested talking points based on last interaction and signals',
    ],
    metric: { num: '23%', label: 'higher close rate in pilot cohort', sub: 'Across 14 AEs over a 90-day pilot period' },
    brief: ['Nexora call at 2pm - brief ready', '2 commitments due today', 'Indus Fintech: 8 days silent - re-engage now'],
  },
  {
    id: 'ceo',
    label: 'CEO / Founder',
    role: 'Revenue Confidence',
    pain: "Your quarterly number is a spreadsheet. By the time you see a risk, it\'s already a miss.",
    stops: [
      'End-of-quarter surprises you could have seen coming',
      'Forecast reviews that are really just hope sessions',
      'Relying on VP summaries to understand pipeline health',
      'Discovering deal losses after the fact',
    ],
    gets: [
      'Live pipeline confidence score - signal-backed, not rep-reported',
      'Risk-adjusted forecast: best case, likely, at-risk breakdown',
      'Deal velocity trends: is the quarter accelerating or stalling?',
      'Revenue at risk flagged 30+ days before quarter close',
    ],
    metric: { num: '±8%', label: 'forecast accuracy in early pilots', sub: 'vs industry average of ±35–40% without a signal layer' },
    brief: ['Q2 forecast: ₹4.2Cr likely, ₹1.1Cr at risk', 'Pipeline velocity down 12% this week', '3 enterprise deals stalled - need exec touch'],
  },
];

export default function PersonaTabs() {
  const [active, setActive] = useState(0);
  const p = personas[active];

  return (
    <section id="for-teams" className="ptab-section" style={{ background: '#0F172A' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ maxWidth: '560px', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'white', margin: '0 0 0.75rem' }}>
            Whether you're running the company<br />
            <span style={{ color: '#60A5FA' }}>or the team.</span>
          </h2>
          <p style={{ fontSize: '1rem', color: '#94A3B8', margin: 0, lineHeight: 1.6 }}>Lumo delivers a different view to every revenue role - same data, right context.</p>
        </div>

        {/* Tab shell - tabs + panel in one bordered unit */}
        <div className="ptab-shell">

        {/* Tab bar */}
        <div className="ptab-bar">
          {personas.map((persona, i) => (
            <button
              key={persona.id}
              onClick={() => { setActive(i); window.posthog?.capture('persona_tab_viewed', { persona_id: persona.id, persona_label: persona.label }); }}
              className={`ptab-btn${i === active ? ' ptab-btn-active' : ''}`}
            >
              {persona.label}
            </button>
          ))}
        </div>

        {/* Card */}
        <div key={active} className="persona-card">

          {/* Top bar */}
          <div className="pcard-top">
            <div className="pcard-role-block">
              <span className="pcard-role-label">{p.role}</span>
              <p className="pcard-pain">"{p.pain}"</p>
            </div>
            <div className="pcard-metric-block">
              <span className="pcard-metric-num">{p.metric.num}</span>
              <span className="pcard-metric-label">{p.metric.label}</span>
              <span className="pcard-metric-sub">{p.metric.sub}</span>
            </div>
          </div>

          {/* Body */}
          <div className="pcard-body">

            {/* Left: stop doing */}
            <div className="pcard-col pcard-col-dim">
              <div className="pcard-col-header pcard-col-header-dim">Without Lumo</div>
              <ul className="pcard-list pcard-list-dim">
                {p.stops.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>

            {/* Right: what they get */}
            <div className="pcard-col pcard-col-bright">
              <div className="pcard-col-header pcard-col-header-bright">With Lumo</div>
              <ul className="pcard-list pcard-list-bright">
                {p.gets.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>

            {/* Morning brief */}
            <div className="pcard-brief">
              <div className="pcard-brief-label">Your morning briefing</div>
              {p.brief.map((b, i) => (
                <div key={i} className="pcard-brief-row">
                  <span className="pcard-brief-dot" />
                  <span className="pcard-brief-text">{b}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        </div>{/* end ptab-shell */}
      </div>

      <style>{`
        .ptab-section { padding: 6rem 1.5rem; }

        .ptab-shell {
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          overflow: hidden;
          background: white;
        }
        .ptab-bar {
          display: flex;
          background: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
          overflow-x: auto;
        }
        .ptab-btn {
          padding: 12px 22px;
          border: none;
          border-bottom: 2px solid transparent;
          background: transparent;
          color: #64748B;
          font-size: 0.84rem;
          font-weight: 500;
          cursor: pointer;
          font-family: inherit;
          white-space: nowrap;
          transition: color 0.15s;
          margin-bottom: -1px;
        }
        .ptab-btn:hover { color: #334155; }
        .ptab-btn-active {
          color: #1E40AF;
          font-weight: 600;
          background: white;
          border-bottom-color: #1E40AF;
        }
        .persona-card {
          background: white;
          animation: tabFadeIn 0.2s ease;
        }
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Top bar */
        .pcard-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          align-items: start;
          padding: 1.75rem 1.75rem 1.5rem;
          border-bottom: 1px solid #F1F5F9;
        }
        .pcard-role-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #94A3B8;
          margin-bottom: 0.5rem;
        }
        .pcard-pain {
          font-size: 1.05rem;
          font-weight: 500;
          color: #0F172A;
          line-height: 1.5;
          margin: 0;
        }
        .pcard-metric-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          flex-shrink: 0;
        }
        .pcard-metric-num {
          font-size: 2.25rem;
          font-weight: 800;
          color: #1E40AF;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .pcard-metric-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: #0F172A;
          text-align: right;
        }
        .pcard-metric-sub {
          font-size: 0.68rem;
          color: #94A3B8;
          text-align: right;
          max-width: 220px;
          line-height: 1.4;
        }

        /* Body */
        .pcard-body {
          display: grid;
          grid-template-columns: 1fr 1fr 220px;
          gap: 0;
        }
        .pcard-col { padding: 1.5rem 1.75rem; }

        .pcard-col-header {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.875rem;
        }
        .pcard-col-dim   { background: #FEF2F2; }
        .pcard-col-bright { background: #F0FDF4; }
        .pcard-col-header-dim   { color: #EF4444; }
        .pcard-col-header-bright { color: #1E40AF; }

        .pcard-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .pcard-list li {
          font-size: 0.82rem;
          line-height: 1.55;
          padding: 7px 0 7px 16px;
          position: relative;
          border-bottom: 1px solid #F1F5F9;
        }
        .pcard-list li:last-child { border-bottom: none; }
        .pcard-list-dim li { color: #475569; }
        .pcard-list-dim li::before {
          content: '';
          width: 5px; height: 5px;
          background: #FCA5A5;
          border-radius: 50%;
          position: absolute; left: 1px; top: 12px;
        }
        .pcard-list-bright li { color: #334155; }
        .pcard-list-bright li::before {
          content: '';
          width: 5px; height: 5px;
          background: #1E40AF;
          border-radius: 50%;
          position: absolute; left: 1px; top: 12px;
        }

        /* Divider */
        .pcard-divider {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 0;
          gap: 6px;
        }
        .pcard-div-line { flex: 1; width: 1px; background: #E2E8F0; }
        .pcard-div-pill {
          font-size: 0.62rem; font-weight: 700; color: #CBD5E1;
          width: 24px; height: 24px; border-radius: 50%;
          border: 1px solid #E2E8F0;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* Morning brief */
        .pcard-brief {
          background: #F8FAFC;
          border-left: 1px solid #E2E8F0;
          padding: 1.5rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .pcard-brief-label {
          font-size: 0.65rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: #94A3B8; margin-bottom: 4px;
        }
        .pcard-brief-row {
          display: flex; align-items: flex-start; gap: 8px;
        }
        .pcard-brief-dot {
          width: 6px; height: 6px;
          background: #1E40AF; border-radius: 50%;
          flex-shrink: 0; margin-top: 5px;
        }
        .pcard-brief-text {
          font-size: 0.78rem; color: #334155; line-height: 1.45;
        }

        @media (max-width: 900px) {
          .ptab-section { padding: 4.5rem 1.25rem; }
          .pcard-top { grid-template-columns: 1fr; gap: 1rem; padding: 1.25rem; }
          .pcard-metric-block { align-items: flex-start; }
          .pcard-metric-sub { text-align: left; }
          .pcard-body { grid-template-columns: 1fr; }
          .pcard-divider { flex-direction: row; padding: 0 1.75rem; height: 32px; }
          .pcard-div-line { flex: 1; height: 1px; width: auto; }
          .pcard-brief { border-left: none; border-top: 1px solid #E2E8F0; }
          .ptab-btn { padding: 10px 16px; font-size: 0.8rem; }
        }

        @media (max-width: 640px) {
          .ptab-section { padding: 4rem 1rem; }
          .pcard-top { padding: 1rem; }
          .pcard-col { padding: 1rem; }
          .pcard-brief { padding: 1rem; }
          .pcard-metric-num { font-size: 1.75rem; }
          .pcard-pain { font-size: 0.9rem; }
          .ptab-btn { padding: 9px 12px; font-size: 0.78rem; }
        }
      `}</style>
    </section>
  );
}
