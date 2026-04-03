"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="min-h-screen bg-surface flex">
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-[20px] border-b border-outline-variant/15">
        <div className="flex items-center justify-between px-[1.5rem] py-[1rem]">
          <h1 className="text-[1.5rem] font-bold text-on-surface">
            IKF
          </h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-on-surface p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-surface-container/95 backdrop-blur-[20px] pt-[4rem]">
          <div className="flex flex-col items-center gap-[2rem] p-[2rem]">
            <div className="text-center mb-[2rem]">
              <h2 className="text-[2rem] font-bold text-on-surface mb-[0.5rem]">
                Isaiah Ferguson
              </h2>
              <p className="text-[1rem] font-medium text-on-surface-variant">
                Coding Advocate
              </p>
            </div>
            <nav className="flex flex-col gap-[1.5rem] items-center">
              {[
                { id: "hero", label: "Home" },
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "skills", label: "Skills" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-[1rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex gap-[1.5rem] mt-[2rem]">
              <a
                href="https://github.com/Isaiah-Ferguson"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-tertiary-container hover:text-primary transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/isaiah-ferguson"
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-tertiary-container hover:text-primary transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      <aside className="hidden lg:flex lg:fixed lg:inset-y-0 lg:w-[420px] lg:flex-col lg:px-[5.5rem] lg:py-[7rem] bg-surface">
        <div className="flex flex-col gap-[4rem]">
          <div>
            <h1 className="text-[3.5rem] font-bold leading-tight text-on-surface mb-[1rem]">
              Isaiah Ferguson
            </h1>
            <p className="text-[1.125rem] font-medium text-on-surface-variant mb-[0.5rem]">
              Coding Advocate
            </p>
            <p className="text-[1rem] text-on-tertiary-container">
              San Joaquin County Office of Education
            </p>
          </div>

          <nav className="flex flex-col gap-[1.25rem]">
            {[
              { id: "hero", label: "Home" },
              { id: "about", label: "About" },
              { id: "experience", label: "Experience" },
              { id: "projects", label: "Projects" },
              { id: "skills", label: "Skills" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className="group flex items-center gap-[1rem] transition-all duration-300"
              >
                <span
                  className={`h-[2px] transition-all duration-300 ${
                    activeSection === item.id
                      ? "w-[2rem] bg-primary"
                      : "w-[1rem] bg-on-tertiary-container group-hover:w-[1.5rem] group-hover:bg-primary"
                  }`}
                />
                <span
                  className={`text-[0.75rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-on-tertiary-container group-hover:text-on-surface-variant"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-auto flex gap-[1.5rem]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-tertiary-container hover:text-primary transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-tertiary-container hover:text-primary transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-[420px]">
        <div className="bg-surface-container-low min-h-screen px-[1.5rem] py-[2.75rem] pt-[5rem] lg:px-[5.5rem] lg:py-[7rem]">
          <div className="max-w-[900px] group/page">
            <section id="hero" className="mb-[4rem] lg:mb-[7rem]">
              <div className="flex flex-col lg:flex-row items-center gap-[2rem] lg:gap-[3rem]">
                <div className="flex-1 space-y-[1rem]">
                  <h2 className="text-[2rem] lg:text-[2.5rem] font-bold text-on-surface leading-tight">
                    Empowering the Next Generation Through Code
                  </h2>
                  <p className="text-[1.125rem] text-on-surface-variant leading-relaxed">
                    Coding Advocate at SJCOE, bridging education and technology. Building robust backend systems with C# and EF Core, crafting modern frontends with Next.js—making coding education accessible and impactful.
                  </p>
                  <div className="pt-[1rem] flex flex-wrap gap-[1rem]">
                    <a
                      href="mailto:isaiahkferguson89@gmail.com"
                      className="inline-block bg-gradient-to-br from-primary to-primary-container text-on-primary font-semibold px-[2rem] py-[0.75rem] rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105"
                    >
                      Contact Me
                    </a>
                    <a
                      href="/Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-[0.5rem] bg-surface-container text-on-surface font-semibold px-[2rem] py-[0.75rem] rounded-lg transition-all duration-300 hover:bg-surface-container-high hover:shadow-lg hover:scale-105 border border-outline-variant/20"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Resume
                    </a>
                  </div>
                </div>
                <div className="relative w-[240px] h-[240px] lg:w-[280px] lg:h-[280px] shrink-0 overflow-hidden ring-2 ring-primary/20 rounded-lg">
                  <Image
                    src="/Isaiah.png"
                    alt="Isaiah Ferguson"
                    fill
                    sizes="(max-width: 1024px) 240px, 280px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </section>

            <section id="about" className="mb-[4rem]">
              <h2 className="text-[1.5rem] font-semibold text-on-surface mb-[1.5rem] -ml-[1rem]">
                About
              </h2>
              <div className="space-y-[1rem] text-[1rem] text-on-surface-variant leading-relaxed">
                <p>
                  As a Coding Advocate at the San Joaquin County Office of Education, I bridge the gap between 
                  education and technology, empowering educators and students to harness the power of code.
                </p>
                <p>
                  With deep expertise in C# and Entity Framework Core, I build robust, scalable backend systems 
                  that power educational platforms. On the frontend, I craft modern, responsive experiences using 
                  Next.js and React, ensuring accessibility and performance are never compromised.
                </p>
                <p>
                  My mission is to make coding education accessible, engaging, and impactful—transforming how 
                  the next generation learns to build the future.
                </p>
              </div>
            </section>

            <section id="experience" className="mb-[4rem] group/section transition-all duration-300">
              <h2 className="text-[1.5rem] font-semibold text-on-surface mb-[2.75rem] -ml-[1rem]">
                Experience
              </h2>
              <div className="space-y-[2.75rem]">
                <article className="group/item relative p-[1.5rem] -mx-[1.5rem] transition-all duration-300 hover:bg-surface-container/80 hover:backdrop-blur-md hover:translate-x-[2px] group-hover/section:opacity-50 hover:!opacity-100 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-[0.5rem] mb-[1rem]">
                    <div>
                      <h3 className="text-[1.125rem] font-medium text-on-surface transition-colors duration-300">
                        Code Advocate
                      </h3>
                      <p className="text-[1rem] text-on-surface-variant">
                        CodeStack Academy
                      </p>
                    </div>
                    <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-on-tertiary-container">
                      Sep 2025 — Present
                    </span>
                  </div>
                  <ul className="text-[1rem] text-primary leading-relaxed mb-[1rem] space-y-[0.5rem] list-disc list-inside">
                    <li>Leading outreach efforts for CodeStack Academy, speaking in front of crowds and heading academy initiatives. Promoting the program through events, workshops, and informational sessions to attract prospective students.</li>
                    <li><strong className="text-on-surface">SEIS (Special Education Information System):</strong> One of the largest special education platforms in California, used by over 90% of school districts. Contributed to the development of a C# .NET Web API and built dynamic form interfaces using AngularJS, supporting large-scale data management for thousands of users across the state.</li>
                  </ul>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {["Public Speaking", "Outreach", "Education", "Leadership", "C#", ".NET Web API", "AngularJS"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest text-primary text-[0.75rem] font-semibold px-[0.5rem] py-[0.175rem] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>

                <article className="group/item relative p-[1.5rem] -mx-[1.5rem] transition-all duration-300 hover:bg-surface-container/80 hover:backdrop-blur-md hover:translate-x-[2px] group-hover/section:opacity-50 hover:!opacity-100 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-[0.5rem] mb-[1rem]">
                    <div>
                      <h3 className="text-[1.125rem] font-medium text-on-surface group-hover/item:text-primary transition-colors duration-300 ">
                        Junior Web Developer
                      </h3>
                      <p className="text-[1rem] text-on-surface-variant">
                        CodeStack Academy
                      </p>
                    </div>
                    <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-on-tertiary-container">
                      Aug 2023 — Aug 2025
                    </span>
                  </div>
                  <ul className="text-[1rem] text-primary leading-relaxed mb-[1rem] space-y-[0.5rem] list-disc list-inside">
                    <li>Developed engaging lesson plans utilizing effective teaching methodologies to cater to diverse learning styles</li>
                    <li><strong className="text-on-surface">CAPTAIN:</strong> Developed full-stack components pulling information from the database and setting up backend endpoints using C# and Azure Database Studios</li>
                    <li><strong className="text-on-surface">IHubSJ.org:</strong> Designed user-friendly components mapping backend data for Business Metrics input, utilizing Azure DevOps for ticketing and coordination</li>
                  </ul>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {["C#", "Azure", "Full-Stack", "React", "Teaching"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest text-primary text-[0.75rem] font-semibold px-[0.5rem] py-[0.175rem] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>

              </div>
            </section>

            <section id="projects" className="mb-[4rem] group/section transition-all duration-300">
              <h2 className="text-[1.5rem] font-semibold text-on-surface mb-[2.75rem] -ml-[1rem]">
                Featured Projects
              </h2>
              <div className="space-y-[2.75rem]">
                <article className="group/item relative p-[1.5rem] -mx-[1.5rem] transition-all duration-300 hover:bg-surface-container/80 hover:backdrop-blur-md hover:translate-x-[2px] group-hover/section:opacity-50 hover:!opacity-100 rounded-lg">
                  <a href="https://csa-lms-dusky.vercel.app/login" target="_blank" rel="noopener noreferrer" className="block">
                    <h3 className="text-[1.125rem] font-medium text-on-surface transition-colors duration-300 mb-[1rem] flex items-center gap-[0.5rem] group-hover/item:text-primary">
                      Custom LMS
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/item:translate-x-[2px] group-hover/item:-translate-y-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </h3>
                  </a>
                  <p className="text-[1rem] text-primary leading-relaxed mb-[1rem]">
                    Built a comprehensive REST API using ASP.NET Core and Entity Framework Core to manage 
                    student progress, course content, and assessments. Implemented complex data relationships, 
                    authentication, and role-based authorization.
                  </p>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {["C#", "ASP.NET Core", "EF Core", "SQL Server", "JWT"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest text-primary text-[0.75rem] font-semibold px-[0.5rem] py-[0.175rem] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>

                <article className="group/item relative p-[1.5rem] -mx-[1.5rem] transition-all duration-300 hover:bg-surface-container/80 hover:backdrop-blur-md hover:translate-x-[2px] group-hover/section:opacity-50 hover:!opacity-100 rounded-lg">
                  <a href="https://teamcamawebsite.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
                    <h3 className="text-[1.125rem] font-medium text-on-surface transition-colors duration-300 mb-[1rem] flex items-center gap-[0.5rem] group-hover/item:text-primary">
                      Team Cama Website
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/item:translate-x-[2px] group-hover/item:-translate-y-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </h3>
                  </a>
                  <p className="text-[1rem] text-primary leading-relaxed mb-[1rem]">
                    Redesigned the TEAM CAMA website using Next.js, creating a modern, responsive interface that highlights programs, branding, and user experience.
                  </p>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "WindSurf"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest text-primary text-[0.75rem] font-semibold px-[0.5rem] py-[0.175rem] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>

                                <article className="group/item relative p-[1.5rem] -mx-[1.5rem] transition-all duration-300 hover:bg-surface-container/80 hover:backdrop-blur-md hover:translate-x-[2px] group-hover/section:opacity-50 hover:!opacity-100 rounded-lg">
                  <a href="https://www.sjcfjcfoundation.org/" target="_blank" rel="noopener noreferrer" className="block">
                    <h3 className="text-[1.125rem] font-medium text-on-surface transition-colors duration-300 mb-[1rem] flex items-center gap-[0.5rem] group-hover/item:text-primary">
                      San Joaquin County Family Justice Center Website
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/item:translate-x-[2px] group-hover/item:-translate-y-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </h3>
                  </a>
                  <p className="text-[1rem] text-primary leading-relaxed mb-[1rem]">
Led the redesign of the San Joaquin County Family Justice Center website in WordPress, improving the overall design and updating graphics, navigation, and donation functionality.                  </p>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {["WordPress", "PHP", "CSS", "Web Design", "UI/UX"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest text-primary text-[0.75rem] font-semibold px-[0.5rem] py-[0.175rem] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>

                <article className="group/item relative p-[1.5rem] -mx-[1.5rem] transition-all duration-300 hover:bg-surface-container/80 hover:backdrop-blur-md hover:translate-x-[2px] group-hover/section:opacity-50 hover:!opacity-100 rounded-lg">
                  <a href="https://csa-card-proj.vercel.app/" target="_blank" rel="noopener noreferrer" className="block">
                    <h3 className="text-[1.125rem] font-medium text-on-surface transition-colors duration-300 mb-[1rem] flex items-center gap-[0.5rem] group-hover/item:text-primary">
                      Code Challenge Platform
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/item:translate-x-[2px] group-hover/item:-translate-y-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </h3>
                  </a>
                  <p className="text-[1rem] text-primary leading-relaxed mb-[1rem]">
                    Full-stack application combining C# backend with Next.js frontend, enabling students 
                    to solve coding challenges with instant feedback. Integrated code execution sandbox 
                    and automated testing.
                  </p>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {["C#", "Next.js", "PostgreSQL", "Docker", "Redis"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest text-primary text-[0.75rem] font-semibold px-[0.5rem] py-[0.175rem] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            </section>

            <section id="skills" className="mb-[4rem]">
              <h2 className="text-[1.5rem] font-semibold text-on-surface mb-[2.75rem]">
                Technical Skills
              </h2>
              <div className="space-y-[1.5rem]">
                <div>
                  <h3 className="text-[1rem] font-medium text-on-surface mb-[1rem]">
                    Languages
                  </h3>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {["C#", "TypeScript", "JavaScript", "HTML", "CSS", "SQL", "SQLite"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest text-primary text-[0.75rem] font-semibold px-[0.5rem] py-[0.175rem] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[1rem] font-medium text-on-surface mb-[1rem]">
                    Frameworks & Libraries
                  </h3>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {["React", "React Native", "Next.js", "Angular", "Angular.js", "Tailwind CSS", "Bootstrap", "Flowbite", ".NET 7-10", "Entity Framework Core", "Blazor", "shadcn", "Unity3D"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest text-primary text-[0.75rem] font-semibold px-[0.5rem] py-[0.175rem] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[1rem] font-medium text-on-surface mb-[1rem]">
                    Tools & Platforms
                  </h3>
                  <div className="flex flex-wrap gap-[0.5rem]">
                    {["Azure DevOps", "Jira", "Azure Database Studios", "Visual Studio", "VS Code", "RESTful APIs", "GitHub", "Version Control", "Figma"].map((tech) => (
                      <span
                        key={tech}
                        className="bg-surface-container-highest text-primary text-[0.75rem] font-semibold px-[0.5rem] py-[0.175rem] rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <footer className="pt-[4rem] border-t border-outline-variant/15">
              <p className="text-[0.75rem] text-on-tertiary-container">
                Built with Next.js and Tailwind CSS.
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
