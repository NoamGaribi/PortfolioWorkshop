// All site copy lives here. Facts come from PROJECT.md (sourced from resume.pdf).
// Optional fields left undefined are [TODO] in PROJECT.md and are not rendered.

export type Project = {
  name: string;
  subtitle: string;
  role: string;
  dates: string;
  location?: string;
  status?: string;
  what: string;
  tools: string[];
  result: { before: string; mark: string; after: string };
  note: string;
  link?: string;
};

export type SmallProject = {
  name: string;
  when: string;
  tools: string[];
  description: string;
  link?: string;
};

export type Role = {
  dates: string;
  title: string;
  org: string;
  summary: string;
  // Substring of `summary` that gets the red-pen underline.
  mark?: string;
};

export const site = {
  name: "Noam Garibi",
  headline:
    "Computer Science student at San Diego State University building full-stack products that save people time.",
  subline: ["B.S. Computer Science", "SDSU", "Class of 2028", "San Diego, CA"],
  lookingFor: "Summer SWE internship",

  about:
    "I’m a Computer Science student at San Diego State University. I chose to pursue coding because I enjoy problem solving and I have a desire to create impact and push innovation forward. I’ve worked on full-stack projects and currently develop product features and automation systems at LEICHT, focusing on clean design, scalability, and practical use. I also help lead the World Computing Organization, where I organize events and collaborate on technical projects. I’m always looking to grow as an engineer and build things that I find important.",

  projects: [
    {
      name: "LEICHT USA",
      subtitle: "Order-revision automation",
      role: "Software Engineer",
      dates: "Jan 2026 – Aug 2026",
      location: "Orange County, CA",
      what: "Built a layout-aware PDF parser and an automated order-revision workflow that compares factory confirmations against original orders and flags discrepancies. Moved parsing to background jobs so uploads don’t block requests.",
      tools: ["TypeScript", "Next.js", "React", "Node.js", "MongoDB", "AWS S3"],
      result: { before: "Saves designers ", mark: "approximately 7 hours per order", after: "." },
      note: "↖ per order, for designers",
    },
    {
      name: "EasyCoach.Club",
      subtitle: "Staff permissions & custom data",
      role: "Software Engineer Intern",
      dates: "Jun 2026 – Aug 2026",
      location: "Tel Aviv, Israel",
      what: "Built an end-to-end staff permissions system and expanded staff/player data models with static and club-defined custom fields across 16 languages. Rebuilt club onboarding and admin tooling: branding, feature toggles, team/player filters, and database-driven per-club feature configuration.",
      tools: ["React", "PHP/CodeIgniter", "MySQL", "AWS S3", "Cloudflare"],
      result: {
        before: "Clubs can collect staff data they couldn’t before, with sensitive information restricted from unauthorized users. ",
        mark: "15+ production-ready features",
        after: " shipped across the stack.",
      },
      note: "↖ across the stack",
    },
    {
      name: "X-ray Browser Extension",
      subtitle: "Detecting manipulative design",
      role: "Personal project",
      dates: "Aug 2026 – Present",
      status: "Building",
      what: "A Chrome extension that detects manipulative web design: asymmetric consent controls, pre-enabled settings, refusal friction, and deceptive banner behavior. A React overlay maps findings to page elements, and LLM-based analysis runs through a server-side Next.js API and Vercel AI Gateway for text judgments beyond deterministic rules.",
      tools: ["TypeScript", "React", "WXT", "Next.js", "Vercel"],
      result: {
        before: "Detectors validated against 12 saved real-world pages with ",
        mark: "115 tests",
        after: ", including negative cases designed to produce no findings.",
      },
      note: "↖ verified on 12 real pages",
    },
  ] satisfies Project[],

  smallProjects: [
    {
      name: "AI Syllabus Calendar",
      when: "Dec 2025 – Jan 2026",
      tools: ["JavaScript", "Vercel AI SDK", "Google Calendar API"],
      description:
        "A web app that uses LLM-based text processing to pull exams and deadlines out of uploaded syllabi and create Google Calendar events automatically.",
    },
    {
      name: "Clumzy Aztecs",
      when: "Hackathon",
      tools: ["React", "JavaScript", "OCR", "SendGrid"],
      description:
        "A lost-ID prototype that reads student identifiers from uploaded images with OCR, matches them against a directory, and sends automated email alerts.",
    },
  ] satisfies SmallProject[],

  experience: [
    {
      dates: "Aug 2026 – Present",
      title: "Teaching Associate, Computer Organization and Data Structures",
      org: "San Diego State University",
      summary:
        "Guide 90+ students through programming concepts and debugging in office hours and one-on-one sessions. Grade assignments and give feedback on code quality and problem-solving.",
      mark: "90+ students",
    },
    {
      dates: "Jun 2026 – Aug 2026",
      title: "Software Engineer Intern",
      org: "EasyCoach.Club · Tel Aviv",
      summary:
        "15+ production features for a football-club management platform: staff permissions, 16-language custom fields, an onboarding/admin rebuild, and safe retries for failure-prone network workflows.",
      mark: "16-language",
    },
    {
      dates: "Jan 2026 – Aug 2026",
      title: "Software Engineer",
      org: "LEICHT USA · Orange County",
      summary:
        "Production features for a kitchen-design project management platform (design workflows, orders, project tracking, catalogs, financial data). PDF order-revision workflow saving ~7 hrs per order. Led an automated CRM lead follow-up system with eligibility rules and cron scheduling. AI competitor analysis, AI website audits, and custom Claude skills for campaign assets, contributing to 800+ new website users and a 100%+ increase in average engagement time within one month.",
      mark: "800+ new website users",
    },
    {
      dates: "Nov 2025 – Present",
      title: "Vice President",
      org: "World Computing Organization, SDSU",
      summary:
        "Lead a 12-member executive board serving a 200+ member computing organization. Organize workshops, speakers, hack days, and project events averaging ~55 attendees.",
      mark: "200+ member",
    },
    {
      dates: "Aug 2025 – Dec 2025",
      title: "Recruitment Assistant",
      org: "Hillel Business Initiative",
      summary: "Led recruitment that grew average club membership from ~20 to 35–40 students.",
    },
  ] satisfies Role[],

  education: {
    school: "San Diego State University",
    detail: "B.S. Computer Science · Aug 2024 – May 2028 · GPA 3.81 · Dean’s List",
  },

  skills: [
    { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "C++", "Assembly", "HTML/CSS"] },
    { label: "Frameworks/Backend", items: ["React", "Next.js", "Node.js", "PHP/CodeIgniter"] },
    { label: "Data/Cloud/Tools", items: ["MySQL", "MongoDB", "AWS S3", "Cloudflare", "Vercel", "Git"] },
    { label: "APIs/AI", items: ["OpenAI GPT-4o", "Vercel AI SDK", "Google Calendar API", "SendGrid", "OCR"] },
  ],

  contact: {
    email: "noamgaribi@gmail.com",
    linkedin: "https://www.linkedin.com/in/noamgaribi",
    github: "https://github.com/NoamGaribi",
  },
};
