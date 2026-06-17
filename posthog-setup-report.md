# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Lumo marketing site. PostHog is initialized via a reusable `src/components/posthog.astro` component (using the `is:inline` directive to prevent Astro/TypeScript from processing it) and loaded in `src/layouts/BaseLayout.astro` so it runs on every page. Environment variables (`PUBLIC_POSTHOG_PROJECT_TOKEN`, `PUBLIC_POSTHOG_HOST`) are stored in `.env` and referenced via `import.meta.env` — no keys are hardcoded. Seven custom events cover the full visitor journey, from first nav click through full design-partner application.

| Event | Description | File |
|---|---|---|
| `nav_cta_clicked` | User clicks "Join Waitlist" in the nav bar (desktop or mobile). Properties: `nav_type`. | `src/components/Nav.astro` |
| `waitlist_signup_submitted` | User submits the hero email waitlist form. Properties: `email`, `source`. Also calls `posthog.identify`. | `src/components/sections/Hero.astro` |
| `hero_carousel_interacted` | User manually navigates the hero output carousel dots. Properties: `slide_index`. | `src/components/sections/Hero.astro` |
| `how_it_works_cta_clicked` | User clicks "Join the Waitlist" in the How It Works section. | `src/components/sections/HowItWorks.astro` |
| `persona_tab_viewed` | User switches persona tabs in the "For Teams" section. Properties: `persona_id`, `persona_label`. | `src/components/sections/PersonaTabs.tsx` |
| `questions_cta_clicked` | User clicks "Join Waitlist" in the Questions Answered section. | `src/components/sections/QuestionsAnswered.astro` |
| `design_partner_form_submitted` | User submits the full design-partner application. Properties: `crm`, `team_size`, `company`. Also calls `posthog.identify` with name/email/phone/company. | `src/components/sections/DesignPartnerCTA.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/474047/dashboard/1723732)
- [Waitlist conversion funnel](https://us.posthog.com/project/474047/insights/9vAkWLMe) — 3-step funnel: nav CTA → hero signup → full application
- [Waitlist signups over time](https://us.posthog.com/project/474047/insights/XPsR62lU) — daily trend comparing hero signups vs full applications
- [Persona tab engagement](https://us.posthog.com/project/474047/insights/RECX0vMG) — which persona (VP Sales, RevOps, etc.) gets the most interest
- [CTA button performance](https://us.posthog.com/project/474047/insights/IhzfNL1m) — nav vs How It Works vs Questions Answered CTAs over time
- [Hero carousel interactions](https://us.posthog.com/project/474047/insights/FbLguyjj) — engagement with the output carousel in the hero section

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` to `.env.example` (or any monorepo bootstrap scripts) so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.
- [ ] Confirm the returning-visitor path also calls `identify` — the current implementation only identifies on waitlist/form submit, so repeat visitors who don't submit a form will remain on anonymous distinct IDs until they convert.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-astro-static/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
