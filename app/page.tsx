import { site, type Project, type Role, type SmallProject } from "@/content/site";
import { Mark } from "@/components/Mark";
import { PenaltyBox } from "@/components/PenaltyBox";

const linkClass =
  "underline decoration-rule decoration-1 underline-offset-4 transition-colors hover:text-pool hover:decoration-pool";

function Section({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className="scroll-mt-20 border-t border-rule py-16 sm:py-24">
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <h2
          id={`${id}-label`}
          className="font-mono text-xs uppercase tracking-[0.16em] text-muted md:col-span-3 md:pt-1.5"
        >
          {index} — {label}
        </h2>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  );
}

function Tools({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.1em] text-muted">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

function ProjectCard({ project, n }: { project: Project; n: number }) {
  return (
    <article className="border border-ink/80 p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-xs uppercase tracking-[0.12em] text-muted">
        <span>
          {String(n).padStart(2, "0")} · {project.role}
          {project.location && ` · ${project.location}`}
        </span>
        <span className="flex items-center gap-3">
          {project.status && (
            <span className="border border-mark px-2 py-0.5 text-mark">{project.status}</span>
          )}
          {project.dates}
        </span>
      </div>
      <h3 className="mt-5 font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">{project.name}</h3>
      <p className="mt-1 text-lg text-muted">{project.subtitle}</p>
      <p className="mt-5 max-w-2xl leading-relaxed">{project.what}</p>
      <p className="mt-5 max-w-2xl leading-loose">
        <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">Result: </span>
        {project.result.before}
        <Mark note={project.note}>{project.result.mark}</Mark>
        {project.result.after}
      </p>
      <div className="mt-6 border-t border-rule pt-4">
        <Tools items={project.tools} />
      </div>
      {project.link && (
        <a href={project.link} className={`mt-4 inline-block ${linkClass}`}>
          View project →
        </a>
      )}
    </article>
  );
}

function RoleSummary({ role }: { role: Role }) {
  if (!role.mark || !role.summary.includes(role.mark)) return <>{role.summary}</>;
  const [before, after] = role.summary.split(role.mark);
  return (
    <>
      {before}
      <Mark variant="underline">{role.mark}</Mark>
      {after}
    </>
  );
}

export default function Home() {
  const { contact } = site;
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-sm">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-14 w-full max-w-[1120px] items-center justify-between px-5 sm:px-8"
        >
          <a href="#top" className="font-display text-lg font-extrabold tracking-[-0.03em]">
            Noam Garibi<span className="text-mark">.</span>
          </a>
          <ul className="flex gap-6 font-mono text-xs uppercase tracking-[0.14em]">
            {[
              ["Work", "#work"],
              ["Experience", "#experience"],
              ["Play", "#play"],
            ].map(([label, href]) => (
              <li key={href} className="hidden md:block">
                <a href={href} className="transition-colors hover:text-pool">
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="transition-colors hover:text-pool">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="main" className="mx-auto w-full max-w-[1120px] flex-1 px-5 sm:px-8">
        {/* Hero */}
        <section id="top" className="flex min-h-[80vh] flex-col justify-center py-20">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
            {site.subline.join(" · ")}
          </p>
          <h1 className="mt-6 font-display text-[clamp(3.5rem,13vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
            Noam
            <br />
            Garibi<span className="text-mark">.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-snug sm:text-2xl">{site.headline}</p>
          {site.lookingFor && (
            <p className="mt-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em]">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-mark" />
              Looking for: {site.lookingFor}
            </p>
          )}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-lg">
            <a href="#work" className={linkClass}>
              See my work ↓
            </a>
            <a href={`mailto:${contact.email}`} className={linkClass}>
              Email me
            </a>
          </div>
        </section>

        <Section id="about" index="01" label="About">
          <p className="max-w-2xl text-xl leading-relaxed">{site.about}</p>
        </Section>

        <Section id="work" index="02" label="Work">
          <div className="flex flex-col gap-8">
            {site.projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} n={i + 1} />
            ))}
          </div>
          <h3 className="mt-14 font-mono text-xs uppercase tracking-[0.16em] text-muted">Smaller projects</h3>
          <ul className="mt-4 divide-y divide-rule border-y border-rule">
            {site.smallProjects.map((p: SmallProject) => (
              <li key={p.name} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted">{p.when}</p>
                </div>
                <div>
                  <p className="leading-relaxed">{p.description}</p>
                  <div className="mt-2">
                    <Tools items={p.tools} />
                  </div>
                  {p.link && (
                    <a href={p.link} className={`mt-2 inline-block ${linkClass}`}>
                      View project →
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="experience" index="03" label="Experience">
          <ol className="border-l border-rule">
            {site.experience.map((r) => (
              <li key={`${r.title}-${r.org}`} className="relative pb-10 pl-6 last:pb-0 sm:pl-8">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-ink bg-paper"
                />
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">{r.dates}</p>
                <h3 className="mt-1.5 text-lg font-semibold leading-snug">{r.title}</h3>
                <p className="text-muted">{r.org}</p>
                <p className="mt-3 max-w-2xl leading-loose">
                  <RoleSummary role={r} />
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-12 border-t border-rule pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Education</p>
            <p className="mt-2 text-lg font-semibold">{site.education.school}</p>
            <p className="text-muted">{site.education.detail}</p>
          </div>
        </Section>

        <Section id="skills" index="04" label="Skills">
          <dl className="divide-y divide-rule border-y border-rule">
            {site.skills.map((g) => (
              <div key={g.label} className="grid gap-1 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs uppercase tracking-[0.12em] text-muted sm:pt-1">{g.label}</dt>
                <dd>{g.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="play" index="05" label="Play">
          <h3 className="font-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">Penalty Box</h3>
          <p className="mt-2 mb-8 max-w-xl text-muted">
            Five shots. The keeper learns where you like to go.
          </p>
          <PenaltyBox />
          <p className="mt-6 max-w-xl italic text-muted">
            I’m a Manchester United fan, and I spent summer 2026 building software for football clubs at
            EasyCoach.Club.
          </p>
        </Section>

        <Section id="contact" index="06" label="Contact">
          <a
            href={`mailto:${contact.email}`}
            className="group font-display text-5xl font-extrabold tracking-[-0.03em] sm:text-7xl"
          >
            Say hi{" "}
            <span aria-hidden="true" className="inline-block text-mark transition-transform group-hover:translate-x-2">
              →
            </span>
          </a>
          <ul className="mt-8 flex flex-col gap-3 text-lg sm:flex-row sm:gap-8">
            <li>
              <a href={`mailto:${contact.email}`} className={linkClass}>
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.linkedin} className={linkClass}>
                LinkedIn
              </a>
            </li>
            <li>
              <a href={contact.github} className={linkClass}>
                GitHub
              </a>
            </li>
          </ul>
        </Section>
      </main>

      <footer className="border-t border-rule">
        <p className="mx-auto w-full max-w-[1120px] px-5 py-8 font-mono text-xs uppercase tracking-[0.12em] text-muted sm:px-8">
          © 2026 Noam Garibi · Built with Next.js
        </p>
      </footer>
    </>
  );
}
