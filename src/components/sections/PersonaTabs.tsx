import { useState } from 'react';

const personas = [
  {
    id: 'vp-sales',
    label: 'VP of Sales',
    emoji: '📊',
    pain: "You review 40 deals a week. You only truly understand 8 of them.",
    answer: 'PrismIQ surfaces the 5 deals that need your attention today — with full context. Stop the status-update meeting.',
    stat: '3.2 hrs saved per manager per week',
    cta: 'See VP of Sales view',
  },
  {
    id: 'revops',
    label: 'RevOps',
    emoji: '⚙️',
    pain: "Your CRM data is always 3 days out of date and you know it.",
    answer: 'Real-time pipeline health from CRM + call + email combined. Data quality issues flagged automatically.',
    stat: '67% reduction in forecast prep time',
    cta: 'See RevOps view',
  },
  {
    id: 'sales-manager',
    label: 'Sales Manager',
    emoji: '🎯',
    pain: "You're coaching blind. You join calls you weren't on. You ask reps what happened.",
    answer: 'Every call summarised. Every commitment tracked. Coach with data, not anecdote.',
    stat: '4× more deals coached per week',
    cta: 'See Manager view',
  },
  {
    id: 'ae',
    label: 'Account Executive',
    emoji: '💼',
    pain: "You walk into calls without knowing what you promised last time or what they care about.",
    answer: '60-second deal brief before every call. Last commitment, last concern, suggested talking points.',
    stat: '23% higher close rate in pilot cohort',
    cta: 'See AE view',
  },
  {
    id: 'ceo',
    label: 'CEO',
    emoji: '🏢',
    pain: "Your quarterly number is a spreadsheet that's already wrong.",
    answer: 'Live pipeline confidence score. Risk-adjusted forecast. No more end-of-quarter surprises.',
    stat: 'Forecast accuracy improved to ±8%',
    cta: 'See CEO view',
  },
];

export default function PersonaTabs() {
  const [active, setActive] = useState(0);
  const p = personas[active];

  return (
    <section id="for-teams" style={{ background: '#F8FAFC', padding: '6rem 1.5rem', borderTop: '1px solid #E2E8F0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        <div style={{ maxWidth: '560px', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.75rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, color: '#0F172A', margin: '0 0 1rem' }}>
            Whether you're running the company<br />
            <span style={{ color: '#1E40AF' }}>or the team.</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748B', margin: 0 }}>PrismIQ speaks to every revenue role differently.</p>
        </div>

        {/* Tab buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '1.5rem' }}>
          {personas.map((persona, i) => (
            <button
              key={persona.id}
              onClick={() => setActive(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '99px',
                border: i === active ? 'none' : '1px solid #E2E8F0',
                background: i === active ? '#1E40AF' : 'white',
                color: i === active ? 'white' : '#64748B',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
            >
              <span>{persona.emoji}</span>
              {persona.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          key={active}
          style={{
            background: 'white',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            animation: 'tabFadeIn 0.25s ease',
          }}
        >
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94A3B8', marginBottom: '0.75rem' }}>The problem</p>
            <p style={{ fontSize: '1.15rem', fontWeight: 500, color: '#0F172A', lineHeight: 1.55, margin: '0 0 1rem' }}>
              "{p.pain}"
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1E40AF', marginBottom: '0.75rem' }}>What PrismIQ does</p>
            <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.65, margin: '0 0 1.25rem' }}>{p.answer}</p>
            <div style={{ background: '#EFF6FF', borderRadius: '10px', padding: '10px 14px', display: 'inline-block' }}>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E40AF', margin: 0 }}>📈 {p.stat}</p>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
