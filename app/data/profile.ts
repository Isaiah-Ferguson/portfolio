import type { JourneyMilestone, SkillConstellation } from "./types";

export const identity = {
  name: "Isaiah Ferguson",
  roles: ["Developer", "Coding Advocate", "Mentor"],
  intro:
    "I build digital experiences, develop practical systems, and help the next generation of developers find their path into technology.",
  organization: "CodeStack Academy · San Joaquin County Office of Education",
  location: "Stockton, California",
};

export const contact = {
  email: "isaiahkferguson89@gmail.com",
  linkedin: "https://www.linkedin.com/in/isaiah-ferguson",
  github: "https://github.com/Isaiah-Ferguson",
  resume: "/Resume.pdf",
};

/** Student → Junior Web Developer → Coding Advocate (project lead & mentor) */
export const journey: JourneyMilestone[] = [
  {
    year: "2023",
    title: "CodeStack Academy Student",
    detail:
      "Enrolled at CodeStack Academy and graduated in 2023 — learning the craft in the same classrooms he now teaches in.",
  },
  {
    year: "2023 – 2025",
    title: "Junior Web Developer",
    detail:
      "Built full-stack features across SJCOE systems — C# and Azure backends, React frontends — including work on CAPTAIN and IHubSJ.org, while developing lesson plans for incoming students.",
  },
  {
    year: "2025 — Present",
    title: "Coding Advocate",
    detail:
      "The role he holds today — recruiting, guiding, and mentoring students entering technology while contributing to SEIS, one of California's largest special-education platforms. As part of that role he leads technical projects with interns, community partners, students, and external clients — connecting education, workforce development, and the Stockton community.",
  },
];

export const sunResponsibilities = [
  {
    id: "advocate",
    title: "Coding Advocate",
    detail:
      "Recruiting, guiding, teaching, and supporting students entering the technology field — from first info session to first job.",
  },
  {
    id: "developer",
    title: "Developer",
    detail:
      "Full-stack development across internal tools, APIs, databases, Azure deployments, responsive interfaces, and client systems.",
  },
  {
    id: "internships",
    title: "Internship Leadership",
    detail:
      "Coordinating interns — assigning work, supporting technical growth, communicating with partners, and leading project delivery.",
  },
  {
    id: "outreach",
    title: "Community Outreach",
    detail:
      "Building relationships with schools, community organizations, workforce partners, universities, and technology programs across Stockton and San Joaquin County.",
  },
  {
    id: "curriculum",
    title: "Curriculum & AI",
    detail:
      "Keeping the academy's curriculum current — from the modern web stack through agentic, AI-assisted development.",
  },
];

/** Technologies orbiting the sun's Curriculum & AI moon. */
export const techOrbit = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "C#",
  "ASP.NET Core",
  "REST APIs",
  "SQL Server",
  "Azure",
  "Azure DevOps",
  "React Native",
  "Claude Code",
  "Agentic Coding",
  "AI Automation",
  "Model Context Protocol",
  "OpenClaw",
];

export const about = {
  bio: "Isaiah Ferguson is a developer and Coding Advocate at CodeStack Academy within the San Joaquin County Office of Education. After graduating from CodeStack Academy in 2023, he progressed from student to Junior Web Developer and then Coding Advocate. Today, he builds software, mentors emerging developers, leads technical projects, supports community partnerships, and helps students begin meaningful careers in technology.",
  martialArts:
    "Whether he is mentoring developers or teaching martial arts, Isaiah believes growth comes through patience, discipline, repetition, and the confidence to keep moving forward.",
  martialArtsDetail:
    "Away from the keyboard, Isaiah has practiced Jiu-Jitsu and Muay Thai for many years and has experience teaching martial arts.",
  photos: [
    {
      src: "/Isaiah.png",
      alt: "Isaiah Ferguson in his role as Coding Advocate at CodeStack Academy",
      caption: "Coding Advocate — CodeStack Academy",
    },
    {
      src: "/CSA_Isaiah.png",
      alt: "Isaiah Ferguson at work in a CodeStack Academy classroom",
      caption: "CodeStack Academy student, 2023",
    },
    {
      src: "/Isaiah.jpg",
      alt: "Isaiah Ferguson sparring during Muay Thai training",
      caption: "On the mats — Muay Thai & Jiu-Jitsu",
    },
  ],
};

export const community = {
  statement:
    "Technology becomes more meaningful when it creates access, builds confidence, and strengthens the community around it.",
  pillars: [
    {
      title: "Student Mentorship",
      detail: "Guiding emerging developers from first lesson to first offer.",
    },
    {
      title: "Career Preparation",
      detail: "Portfolios, interviews, and the habits of professional teams.",
    },
    {
      title: "Community Outreach",
      detail: "Events, workshops, and info sessions across San Joaquin County.",
    },
    {
      title: "School Partnerships",
      detail: "Working with K-12 schools and universities on pathways into tech.",
    },
    {
      title: "Internship Coordination",
      detail: "Real projects, real reviews, real delivery — before the first job.",
    },
    {
      title: "Technical Education",
      detail: "Curriculum from web fundamentals to AI-assisted development.",
    },
    {
      title: "Connecting Learners with Careers",
      detail: "Linking students to workforce partners and employers in technology.",
    },
  ],
};

/**
 * Skill constellations — coordinates live in a 100 × 62 star map.
 * `related` ids illuminate across constellations on hover.
 */
export const skillConstellations: SkillConstellation[] = [
  {
    id: "frontend",
    name: "Front-End Systems",
    color: "#8ed3e6",
    skills: [
      { id: "html", label: "HTML", related: ["css", "js"], x: 6, y: 12 },
      { id: "css", label: "CSS", related: ["html", "tailwind", "responsive"], x: 13, y: 6 },
      { id: "js", label: "JavaScript", related: ["ts", "react", "html"], x: 20, y: 13 },
      { id: "ts", label: "TypeScript", related: ["js", "react", "next", "agentic"], x: 27, y: 7 },
      { id: "react", label: "React", related: ["ts", "next", "js"], x: 30, y: 16 },
      { id: "next", label: "Next.js", related: ["react", "ts", "rest", "azure"], x: 24, y: 22 },
      { id: "tailwind", label: "Tailwind CSS", related: ["css", "next", "responsive"], x: 14, y: 20 },
      { id: "responsive", label: "Responsive Design", related: ["css", "tailwind"], x: 10, y: 26 },
    ],
  },
  {
    id: "backend",
    name: "Back-End Systems",
    color: "#a99bf5",
    skills: [
      { id: "csharp", label: "C#", related: ["aspnet", "efcore", "sql"], x: 44, y: 8 },
      { id: "aspnet", label: "ASP.NET Core", related: ["csharp", "rest", "azure"], x: 52, y: 13 },
      { id: "rest", label: "REST APIs", related: ["aspnet", "next", "auth"], x: 60, y: 7 },
      { id: "efcore", label: "EF Core", related: ["csharp", "sql"], x: 48, y: 21 },
      { id: "auth", label: "Authentication", related: ["rest", "aspnet"], x: 58, y: 18 },
      { id: "sql", label: "SQL Server", related: ["efcore", "csharp", "azuresql"], x: 53, y: 27 },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & Delivery",
    color: "#8ee6d8",
    skills: [
      { id: "azure", label: "Microsoft Azure", related: ["appservice", "azuresql", "blob", "aspnet"], x: 78, y: 8 },
      { id: "appservice", label: "App Service", related: ["azure", "deploy"], x: 86, y: 13 },
      { id: "azuresql", label: "Azure SQL", related: ["azure", "sql"], x: 74, y: 16 },
      { id: "blob", label: "Blob Storage", related: ["azure"], x: 92, y: 8 },
      { id: "devops", label: "Azure DevOps", related: ["azure", "deploy", "projectmgmt"], x: 82, y: 22 },
      { id: "deploy", label: "Deployment & Debugging", related: ["appservice", "devops"], x: 86, y: 27 },
    ],
  },
  {
    id: "leadership",
    name: "Leadership & Education",
    color: "#e8b45a",
    skills: [
      { id: "mentorship", label: "Mentorship", related: ["curriculum", "internships", "speaking"], x: 18, y: 42 },
      { id: "curriculum", label: "Curriculum Support", related: ["mentorship", "claude"], x: 27, y: 37 },
      { id: "projectmgmt", label: "Project Management", related: ["internships", "devops"], x: 35, y: 44 },
      { id: "internships", label: "Internship Leadership", related: ["mentorship", "projectmgmt", "partners"], x: 26, y: 50 },
      { id: "partners", label: "Partner Communication", related: ["internships", "speaking"], x: 15, y: 54 },
      { id: "speaking", label: "Public Speaking", related: ["mentorship", "partners"], x: 8, y: 47 },
    ],
  },
  {
    id: "ai",
    name: "AI & Automation",
    color: "#7ecbb4",
    skills: [
      { id: "claude", label: "Claude Code", related: ["agentic", "mcp", "curriculum"], x: 62, y: 40 },
      { id: "agentic", label: "Agentic Development", related: ["claude", "workflow", "ts"], x: 71, y: 36 },
      { id: "prompt", label: "Prompt Design", related: ["claude", "workflow"], x: 79, y: 42 },
      { id: "workflow", label: "Workflow Automation", related: ["agentic", "prompt", "mcp"], x: 71, y: 47 },
      { id: "mcp", label: "MCP", related: ["claude", "workflow", "openclaw"], x: 62, y: 52 },
      { id: "openclaw", label: "OpenClaw", related: ["mcp", "agentic"], x: 82, y: 52 },
    ],
  },
];
