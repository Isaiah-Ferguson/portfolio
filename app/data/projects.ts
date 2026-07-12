import type { Project } from "./types";

/**
 * Project registry — add a new object here and it appears in the
 * universe (featured: true → its own planet + scroll chapter;
 * featured: false → listed under "Further Transmissions").
 */
export const projects: Project[] = [
  {
    slug: "seis",
    title: "SEIS — Special Education Information System",
    shortTitle: "SEIS",
    category: "Statewide Education Platform",
    summary:
      "One of the largest special-education platforms in California, used by over 90% of the state's school districts. Isaiah contributed to the C# .NET Web API and built dynamic form interfaces supporting large-scale data management for thousands of users across the state.",
    role: "Developer — C# .NET Web API & Dynamic Forms",
    responsibilities: [
      "Contributed to the development of the platform's C# .NET Web API",
      "Built dynamic form interfaces in AngularJS for special-education workflows",
      "Supported large-scale data management serving thousands of users statewide",
      "Worked within an established enterprise codebase, release process, and team",
    ],
    challenge:
      "Special-education compliance in California runs on precise, high-volume data — IEPs, forms, and records for students across more than 90% of the state's districts. The system carrying that weight has to be correct, fast, and dependable every school day.",
    solution:
      "A mature enterprise platform built on a C# .NET Web API with dynamic, data-driven form interfaces — engineered so district staff can manage complex special-education records at scale.",
    process: [
      "Onboarded into a large, long-lived enterprise codebase and its conventions",
      "Developed and extended Web API endpoints in C# .NET",
      "Built AngularJS dynamic form interfaces driven by backend data definitions",
      "Shipped through the team's established review and release pipeline",
    ],
    features: [
      "C# .NET Web API powering statewide workflows",
      "Dynamic, data-driven form interfaces",
      "Large-scale special-education data management",
      "Serving 90%+ of California school districts",
    ],
    impact:
      "Real production engineering at genuine scale — code that supports the special-education workflows of the vast majority of California's school districts, shipped as part of the SJCOE CodeStack team.",
    technologies: ["C#", ".NET Web API", "AngularJS", "SQL", "Enterprise Systems"],
    images: [
      {
        src: null,
        alt: "SEIS platform interface",
        caption: "SEIS interface — add screenshot",
      },
    ],
    liveUrl: "https://www.seis.org",
    repositoryUrl: null,
    featured: true,
    planetStyle: {
      colorA: "#1c2133",
      colorB: "#38405e",
      colorC: "#e6e9ff",
      atmosphere: "#b3aaf0",
      radius: 1.5,
      surface: "network",
      moons: 4,
      spin: 0.045,
    },
    // Same hemisphere as the journey viewpoint (never sweeps the camera
    // through the sun), but well separated from Shining Stars' orbit slot.
    orbitalPosition: { distance: 8, angle: 1.95, inclination: 0.35 },
  },
  {
    slug: "shining-stars-crm",
    title: "Shining Stars Project CRM",
    shortTitle: "Shining Stars",
    category: "Full-Stack CRM & Operations Platform",
    summary:
      "A custom internal platform that helps an educational organization manage students, employees, attendance, planning, documents, schedules, onboarding, notes, and day-to-day operational workflows.",
    role: "Project Lead, Developer & Intern Mentor",
    responsibilities: [
      "Led the project end to end — planning, architecture, delivery, and stakeholder communication",
      "Designed and built the data model and API surface for students, staff, attendance, and documents",
      "Coordinated a team of interns: assigning work, reviewing code, and unblocking technical questions",
      "Owned Azure deployment, blob storage for documents, and the DevOps pipeline",
    ],
    challenge:
      "The organization was coordinating students, staff, schedules, and paperwork across disconnected spreadsheets and manual processes — information lived in too many places to act on quickly.",
    solution:
      "A single internal platform where every operational workflow — attendance, onboarding, scheduling, documents, and notes — lives in one connected system with clear roles and permissions.",
    process: [
      "Sat with the organization's staff to map their real workflows before writing code",
      "Modeled the domain in SQL Server with Entity Framework Core migrations",
      "Built the API in C# / ASP.NET Core with role-based access",
      "Composed the interface in Next.js + TypeScript + Tailwind, screen by workflow",
      "Shipped iteratively to Azure, gathering staff feedback each cycle",
    ],
    features: [
      "Student and employee records with connected histories",
      "Attendance tracking and schedule planning",
      "Document management backed by Azure Blob Storage",
      "Onboarding checklists and operational notes",
      "Role-aware dashboards for staff and leadership",
    ],
    impact:
      "Replaced scattered manual processes with one connected operational system, and served as a real production training ground for the interns who built it alongside Isaiah.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "C#",
      "ASP.NET Core",
      "SQL Server",
      "Entity Framework Core",
      "Azure",
      "Azure Blob Storage",
      "Azure DevOps",
    ],
    images: [
      {
        src: null,
        alt: "Shining Stars CRM dashboard",
        caption: "Operations dashboard — add screenshot",
      },
      {
        src: null,
        alt: "Shining Stars CRM student records view",
        caption: "Student records — add screenshot",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
    featured: true,
    planetStyle: {
      colorA: "#2b3a67",
      colorB: "#4a5d8f",
      colorC: "#8ed3e6",
      atmosphere: "#6f8fd1",
      radius: 1.35,
      surface: "structured",
      ring: { color: "#8ea4d6", inner: 1.7, outer: 2.5, tilt: 0.42 },
      moons: 2,
      spin: 0.06,
    },
    orbitalPosition: { distance: 11, angle: 0.55, inclination: 0.6 },
  },
  {
    slug: "stackfolio",
    title: "Stackfolio",
    shortTitle: "Stackfolio",
    category: "Project & Portfolio Management Platform",
    summary:
      "A platform supporting project creation, user management, team selection, authentication, dashboards, and portfolio workflows for developers building a body of work.",
    role: "Developer, Technical Lead & Intern Mentor",
    responsibilities: [
      "Set the technical direction and reviewed the work of intern contributors",
      "Built REST APIs in C# with JWT authentication and role handling",
      "Developed dashboard and team-selection flows in Next.js",
      "Ran planning and delivery through Azure DevOps boards",
    ],
    challenge:
      "Emerging developers need a structured way to create projects, form teams, and present their work — without stitching together half a dozen disconnected tools.",
    solution:
      "One platform that assembles the pieces: authenticated accounts, project creation, team membership, and dashboards that turn work-in-progress into a presentable portfolio.",
    process: [
      "Defined the platform's entities — users, projects, teams, portfolios — and their relationships",
      "Built authentication first: JWT issuance, refresh, and route protection",
      "Layered project and team workflows onto the secured API",
      "Assembled dashboard views in Next.js, mapping each API resource to an interface panel",
    ],
    features: [
      "JWT-based authentication and protected routes",
      "Project creation and lifecycle management",
      "Team selection and membership workflows",
      "Personal and team dashboards",
      "Portfolio presentation views",
    ],
    impact:
      "A working platform that doubles as a mentorship vehicle — interns shipped real authenticated features under review, the same way they will on production teams.",
    technologies: [
      "Next.js",
      "C#",
      "REST APIs",
      "JWT Authentication",
      "SQL",
      "Azure DevOps",
    ],
    images: [
      {
        src: null,
        alt: "Stackfolio dashboard",
        caption: "Project dashboard — add screenshot",
      },
      {
        src: null,
        alt: "Stackfolio team selection flow",
        caption: "Team selection — add screenshot",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
    featured: true,
    planetStyle: {
      colorA: "#3d3654",
      colorB: "#6b5e93",
      colorC: "#a99bf5",
      atmosphere: "#8f7fe8",
      radius: 1.15,
      surface: "modular",
      moons: 1,
      spin: 0.09,
    },
    orbitalPosition: { distance: 16, angle: 2.2, inclination: -0.9 },
  },
  {
    slug: "codestack-program-systems",
    title: "CodeStack Academy — Website & Program Systems",
    shortTitle: "CodeStack Systems",
    category: "Education, Recruitment & Program Experience",
    summary:
      "Website improvements, program communication, registration experiences, curriculum updates, student resources, and digital content supporting CodeStack Academy's mission.",
    role: "Coding Advocate, Developer, Content Strategist & Student Support",
    responsibilities: [
      "Improved the academy's web presence and registration experience",
      "Represented the program at events, workshops, and informational sessions",
      "Updated curriculum materials and student-facing resources",
      "Supported students from first inquiry through graduation",
    ],
    challenge:
      "Prospective students often don't know a career in software is within reach — the program's story, registration path, and resources have to meet them where they are.",
    solution:
      "A continuously improving set of digital touchpoints — website, registration flows, curriculum content, and student resources — paired with in-person advocacy across San Joaquin County.",
    process: [
      "Gathered feedback from students, instructors, and prospective applicants",
      "Prioritized the friction points that stopped people from applying",
      "Shipped website and content improvements in small, steady iterations",
      "Carried the same story into classrooms, community events, and info sessions",
    ],
    features: [
      "Program website and content improvements",
      "Registration and inquiry experiences",
      "Curriculum updates across the modern web stack",
      "Student resources and communication channels",
    ],
    impact:
      "A clearer front door to the academy — prospective students understand the program, current students find what they need, and the community sees a credible path into technology.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Content Strategy",
      "Public Speaking",
    ],
    images: [
      {
        src: null,
        alt: "CodeStack Academy website",
        caption: "Academy website — add screenshot",
      },
    ],
    liveUrl: "https://codestackacademy.org",
    repositoryUrl: null,
    featured: true,
    planetStyle: {
      colorA: "#6b3f22",
      colorB: "#b3702e",
      colorC: "#f6cd85",
      atmosphere: "#e8b45a",
      radius: 1.5,
      surface: "warm",
      moons: 3,
      spin: 0.05,
    },
    orbitalPosition: { distance: 21, angle: 3.9, inclination: 0.8 },
  },
  {
    slug: "ai-assisted-development",
    title: "AI-Assisted Development & Automation",
    shortTitle: "AI & Automation",
    category: "Emerging Technology",
    summary:
      "Experiments and working systems built with Claude Code, agentic coding, AI-assisted software development, automation, MCP integrations, and modern developer tooling.",
    role: "Developer, Educator & Workflow Designer",
    responsibilities: [
      "Designed agentic development workflows with Claude Code and MCP",
      "Built automations that remove repetitive work from real projects",
      "Taught students and interns how to work effectively alongside AI tools",
      "Evaluated emerging tooling — including OpenClaw — for practical use",
    ],
    challenge:
      "AI tooling is moving faster than most teams can absorb — the gap between what's possible and what's practiced grows every month, especially for developers just entering the field.",
    solution:
      "Treat AI-assisted development as a discipline to be practiced and taught: build real workflows, measure what actually helps, and fold the results into how students and interns learn to ship.",
    process: [
      "Prototyped agentic workflows on real project tasks, not toy demos",
      "Connected tools through the Model Context Protocol",
      "Documented which patterns held up and which didn't",
      "Turned working patterns into teachable material for students and interns",
    ],
    features: [
      "Agentic coding workflows with Claude Code",
      "MCP integrations connecting tools and data",
      "Workflow automation for repetitive development tasks",
      "Curriculum material for AI-assisted development",
    ],
    impact:
      "Students and interns leave with practical AI-collaboration skills — and Isaiah's own projects ship faster because the repetitive layers are automated away.",
    technologies: [
      "Claude Code",
      "Agentic Coding",
      "Model Context Protocol",
      "OpenClaw",
      "AI Automation",
      "TypeScript",
    ],
    images: [
      {
        src: null,
        alt: "AI-assisted development workflow",
        caption: "Agentic workflow — add screenshot",
      },
    ],
    liveUrl: null,
    repositoryUrl: null,
    featured: true,
    planetStyle: {
      colorA: "#1d3b3f",
      colorB: "#2e6b6b",
      colorC: "#8ee6d8",
      atmosphere: "#7ecbb4",
      radius: 1.0,
      surface: "translucent",
      moons: 1,
      spin: 0.14,
    },
    orbitalPosition: { distance: 26, angle: 5.4, inclination: -0.5 },
  },

  /* ── Further transmissions — shipped, linkable work ── */

  {
    slug: "custom-lms",
    title: "Custom LMS",
    shortTitle: "Custom LMS",
    category: "Learning Management System",
    summary:
      "A comprehensive REST API built with ASP.NET Core and Entity Framework Core managing student progress, course content, and assessments — with authentication and role-based authorization.",
    role: "Developer",
    responsibilities: [
      "Built the REST API with ASP.NET Core and EF Core",
      "Modeled complex data relationships for courses, progress, and assessments",
      "Implemented JWT authentication and role-based authorization",
    ],
    challenge:
      "Course content, student progress, and assessments needed one coherent system with real access control.",
    solution:
      "A layered ASP.NET Core API with EF Core relationships and role-aware endpoints.",
    process: [],
    features: [
      "Course and content management",
      "Student progress tracking",
      "Assessments with role-based access",
    ],
    impact: "A working LMS foundation used for academy coursework.",
    technologies: ["C#", "ASP.NET Core", "EF Core", "SQL Server", "JWT"],
    images: [],
    liveUrl: "https://csa-lms-dusky.vercel.app/login",
    repositoryUrl: null,
    featured: false,
    planetStyle: {
      colorA: "#2b3a67",
      colorB: "#4a5d8f",
      colorC: "#8ed3e6",
      atmosphere: "#6f8fd1",
      radius: 0.5,
      surface: "structured",
      moons: 0,
      spin: 0.1,
    },
    orbitalPosition: { distance: 30, angle: 0.9, inclination: 0.2 },
  },
  {
    slug: "team-cama",
    title: "Team Cama Website",
    shortTitle: "Team Cama",
    category: "Community Website",
    summary:
      "Redesigned the TEAM CAMA website with Next.js — a modern, responsive interface highlighting the organization's programs and branding.",
    role: "Developer & Designer",
    responsibilities: [
      "Redesigned the site in Next.js with a responsive, modern interface",
      "Rebuilt program pages and brand presentation",
    ],
    challenge: "The organization's web presence didn't reflect its programs.",
    solution: "A ground-up Next.js redesign focused on clarity and brand.",
    process: [],
    features: ["Responsive redesign", "Program highlights", "Modern branding"],
    impact: "A live site the organization presents to its community.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    images: [],
    liveUrl: "https://teamcamawebsite.vercel.app/",
    repositoryUrl: null,
    featured: false,
    planetStyle: {
      colorA: "#3d3654",
      colorB: "#6b5e93",
      colorC: "#a99bf5",
      atmosphere: "#8f7fe8",
      radius: 0.5,
      surface: "warm",
      moons: 0,
      spin: 0.1,
    },
    orbitalPosition: { distance: 31, angle: 2.6, inclination: -0.3 },
  },
  {
    slug: "sjc-family-justice-center",
    title: "San Joaquin County Family Justice Center",
    shortTitle: "SJC FJC",
    category: "Nonprofit Website",
    summary:
      "Led the redesign of the San Joaquin County Family Justice Center website — improving design, graphics, navigation, and donation functionality.",
    role: "Design Lead & Developer",
    responsibilities: [
      "Led the WordPress redesign",
      "Updated graphics, navigation, and donation flows",
    ],
    challenge:
      "A vital community resource needed a clearer, more trustworthy web presence.",
    solution:
      "A redesigned WordPress site with improved navigation and donations.",
    process: [],
    features: ["Redesigned navigation", "Donation functionality", "Updated graphics"],
    impact: "A live site serving families across San Joaquin County.",
    technologies: ["WordPress", "PHP", "CSS", "UI/UX"],
    images: [],
    liveUrl: "https://www.sjcfjcfoundation.org/",
    repositoryUrl: null,
    featured: false,
    planetStyle: {
      colorA: "#5a3242",
      colorB: "#8f5568",
      colorC: "#e2a3b3",
      atmosphere: "#c98ba0",
      radius: 0.5,
      surface: "warm",
      moons: 0,
      spin: 0.1,
    },
    orbitalPosition: { distance: 32, angle: 4.3, inclination: 0.4 },
  },
  {
    slug: "code-challenge-platform",
    title: "Code Challenge Platform",
    shortTitle: "Code Challenges",
    category: "Developer Education Tool",
    summary:
      "A full-stack application pairing a C# backend with a Next.js frontend so students can solve coding challenges with instant feedback.",
    role: "Developer",
    responsibilities: [
      "Built the C# backend and Next.js frontend",
      "Designed the challenge and feedback loop for students",
    ],
    challenge:
      "Students needed a place to practice with immediate, automatic feedback.",
    solution:
      "A challenge platform with automated checking and instant results.",
    process: [],
    features: ["Coding challenges", "Instant feedback", "Student progress"],
    impact: "A practice environment used by academy students.",
    technologies: ["C#", "Next.js", "PostgreSQL"],
    images: [],
    liveUrl: "https://csa-card-proj.vercel.app/",
    repositoryUrl: null,
    featured: false,
    planetStyle: {
      colorA: "#1d3b3f",
      colorB: "#2e6b6b",
      colorC: "#8ee6d8",
      atmosphere: "#7ecbb4",
      radius: 0.5,
      surface: "modular",
      moons: 0,
      spin: 0.1,
    },
    orbitalPosition: { distance: 33, angle: 5.9, inclination: -0.6 },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const additionalProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
