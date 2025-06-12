"use client";

import { useState } from "react";
import { projectsList } from "./Projects";
import type { Project } from "./Projects";
import "../components/css_files/Projects.css";
import "../components/css_files/ResumeGenerator.css";

const latexTemplate = (projects: typeof projectsList) => `
%-------------------------
% Resume in Latex
% Author : Sidratul Muntaha Ahmed
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

%----------FONT OPTIONS----------
% sans-serif
% \\usepackage[sfdefault]{FiraSans}
% \\usepackage[sfdefault]{roboto}
% \\usepackage[sfdefault]{noto-sans}
% \\usepackage[default]{sourcesanspro}

% serif
% \\usepackage{CormorantGaramond}
% \\usepackage{charter}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{{#1 \\vspace{-2pt}}}
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape Manan Kakkar} \\\\ \\vspace{1pt}
    \\small \\href{mailto:manan.kakkar.2005@outlook.com}{manan.kakkar.2005@outlook.com} $|$ 416-705-7631 $|$ Oakville, Ontario, Canada \\\\
    \\href{https://www.linkedin.com/in/manankakkar11}{\\underline{LinkedIn}}
    \\href{https://github.com/MananKakkar1}{\\underline{GitHub}} \\\\
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {University of Toronto Mississauga}
      {Mississauga, Ontario}
      {Honours Bachelor of Science: Computer Science Specialist}
      {Expected June 2028}
          \\resumeItemListStart
            \\resumeItem{Enrolled in the UTMCIP Co-op Program}
          \\resumeItemListEnd
  \\resumeSubHeadingListEnd

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]

    \\small{\\item{
        \\textbf{Languages}{: Python, Java, JavaScript, TypeScript, C/C++, CSS, HTML, Bash, Assembly (RISC-V)} \\\\
        \\textbf{Frameworks \\& Libraries}{: JavaFX, Tkinter, Flask (Python), React, OpenAI API, Node.js, Express.js, Nodemailer} \\\\
        \\textbf{Tools \\& Environments}{: Vite, Git, GitHub, VS Code, IntelliJ, PyCharm, Vim, OpenHardwareMonitor} \\\\
        \\textbf{Systems \\& Networking}{: Linux/Unix, Shell Scripting, File I/O, Process Management, TCP/IP Networking} \\\\
        \\textbf{Software Concepts}{: Object-Oriented Programming, MVC Architecture, Design Patterns, Unit Testing, Game Logic, State Machines} 
    }}
\\end{itemize}

%-----------PROJECTS-----------
\\section{Projects}
  \\resumeSubHeadingListStart
${projects
  .map(
    (p: Project) => `    \\resumeProjectHeading
        {\\textbf{${p.title}} $|$ \\emph{${p.technologies || "Tech"}}}
        ${p.latex_description}`
  )
  .join("\n")}
  \\resumeSubHeadingListEnd

\\end{document}
`;

const getCategories = () => {
  const cats = Array.from(
    new Set(projectsList.map((p: Project) => p.category))
  );
  return ["All", ...cats];
};

const parseTechnologies = (techString: string): string[] => {
  return techString
    .split("+")
    .map((tech) => tech.trim())
    .filter((tech) => tech.length > 0);
};

const AddIcon = () => (
  <svg
    className="action-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
  </svg>
);

const RemoveIcon = () => (
  <svg
    className="action-icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
  </svg>
);

const ResumeGenerator = () => {
  const [selected, setSelected] = useState("All");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const categories = getCategories();

  const filteredProjects =
    selected === "All"
      ? projectsList
      : projectsList.filter((p: Project) => p.category === selected);

  const handleProjectToggle = (id: string) => {
    setSelectedProjects((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleDownload = () => {
    const latex = latexTemplate(
      projectsList.filter((p: Project) => selectedProjects.includes(p.id))
    );
    const blob = new Blob([latex], { type: "text/x-tex" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.tex";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="projects-page-background">
      <h1>Dynamic Resume Generator</h1>
      <h2 style={{ color: "var(--text)", marginBottom: "20px" }}>
        Click the green "+" button to Include Projects in Resume
      </h2>

      <div className="category-filter">
        <span className="filter-label">Filter by category:</span>
        <div className="filter-buttons">
          {(categories as string[]).map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selected === cat ? "active" : ""}`}
              onClick={() => setSelected(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-list">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            className={`project-entry resume-project ${
              selectedProjects.includes(project.id) ? "selected" : ""
            }`}
          >
            {/* Add the yellow lines above the screen */}
            <div className="gameboy-lines">
              <div className="gameboy-line"></div>
              <div className="gameboy-line"></div>
              <div className="gameboy-line"></div>
            </div>
            <div className="gameboy-screen">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
              />
            </div>
            <h3>{project.title}</h3>
            <div className="gameboy-controls">
              <div className="tech-stack">
                {parseTechnologies(project.technologies).map((tech, index) => (
                  <button key={index} className="tech-badge" title={tech}>
                    {tech}
                  </button>
                ))}
              </div>

              <div className="gameboy-dpad">
                <div className="dpad">
                  <div className="dpad-horizontal"></div>
                  <div className="dpad-vertical"></div>
                  <div
                    className="dpad-center"
                    onClick={() => console.log("Center pressed")}
                  ></div>
                  <div
                    className="dpad-up"
                    onClick={() => console.log("Up pressed")}
                    title="Navigate Up"
                  ></div>
                  <div
                    className="dpad-down"
                    onClick={() => console.log("Down pressed")}
                    title="Navigate Down"
                  ></div>
                  <div
                    className="dpad-left"
                    onClick={() => console.log("Left pressed")}
                    title="Navigate Left"
                  ></div>
                  <div
                    className="dpad-right"
                    onClick={() => console.log("Right pressed")}
                    title="Navigate Right"
                  ></div>
                </div>

                <div className="action-buttons">
                  <button
                    className={`action-button resume-action ${
                      selectedProjects.includes(project.id)
                        ? "remove-btn"
                        : "add-btn"
                    }`}
                    onClick={() => handleProjectToggle(project.id)}
                    title={
                      selectedProjects.includes(project.id)
                        ? "Remove from Resume"
                        : "Add to Resume"
                    }
                  >
                    {selectedProjects.includes(project.id) ? (
                      <RemoveIcon />
                    ) : (
                      <AddIcon />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Selection indicator overlay */}
            {selectedProjects.includes(project.id) && (
              <div className="selection-overlay">
                <div className="selection-checkmark">✓</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="resume-section">
        <h2
          style={{
            color: "var(--text)",
            marginTop: "60px",
            marginBottom: "30px",
          }}
        >
          Projects in Resume ({selectedProjects.length})
        </h2>

        {selectedProjects.length === 0 ? (
          <div className="empty-state">
            <p
              style={{
                color: "var(--label-color)",
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            >
              No projects selected yet. Click ADD on projects above to include
              them in your resume!
            </p>
          </div>
        ) : (
          <div className="projects-list selected-projects-list">
            {projectsList
              .filter((p: Project) => selectedProjects.includes(p.id))
              .map((p: Project) => (
                <div
                  key={p.id}
                  className="project-entry resume-project selected"
                >
                  <div className="gameboy-screen">
                    <img src={p.image || "/placeholder.svg"} alt={p.title} />
                  </div>
                  <h3>{p.title}</h3>
                  <div className="gameboy-controls">
                    <div className="tech-stack">
                      {parseTechnologies(p.technologies).map((tech, index) => (
                        <button key={index} className="tech-badge" title={tech}>
                          {tech}
                        </button>
                      ))}
                    </div>

                    <div className="gameboy-dpad">
                      <div className="dpad">
                        <div className="dpad-horizontal"></div>
                        <div className="dpad-vertical"></div>
                        <div className="dpad-center"></div>
                      </div>

                      <div className="action-buttons">
                        <button
                          className="action-button resume-action remove-btn"
                          onClick={() => handleProjectToggle(p.id)}
                          title="Remove from Resume"
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="selection-overlay">
                    <div className="selection-checkmark">✓</div>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="download-section">
          <button
            className="download-btn"
            onClick={handleDownload}
            disabled={selectedProjects.length === 0}
          >
            {selectedProjects.length === 0
              ? "Select Projects to Download"
              : `Download LaTeX Resume (${selectedProjects.length} projects)`}
          </button>

          <p className="latex-info">
            You can compile the downloaded <code>.tex</code> file using Overleaf
            or your local LaTeX installation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeGenerator;
