"use client";

import { useState } from "react";
import { projectsList } from "./Projects";
import type { Project } from "./Projects";
import "../components/css_files/Projects.css";
import "../components/css_files/ResumeGenerator.css";
import tempImg from "../assets/temp.jpg";

// Improved LaTeX escaper
function escapeLatex(str: string): string {
  if (!str) return "";
  return str
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/%/g, '\\%')
    .replace(/#/g, '\\#')
    .replace(/&/g, '\\&')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/\$/g, '\\$')
    .replace(/\^/g, '\\^{}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\|/g, '\\textbar{}')
    .replace(/</g, '\\textless{}')
    .replace(/>/g, '\\textgreater{}')
    .replace(/"/g, "''")
    .replace(/\r?\n|\r/g, ' ');
}

const latexTemplate = (projects: typeof projectsList) => String.raw`
\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\input{glyphtounicode}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}
\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

\pdfgentounicode=1

\newcommand{\resumeItem}[1]{
  \item\small{{#1 \vspace{-2pt}}}
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

\begin{document}

\begin{center}
    \textbf{\Huge \scshape Manan Kakkar} \\ \vspace{1pt}
    \small \href{mailto:manan.kakkar.2005@outlook.com}{manan.kakkar.2005@outlook.com} $|$
    \href{https://www.linkedin.com/in/manankakkar11}{linkedin.com/in/manankakkar11} $|$
    \href{https://github.com/MananKakkar1}{github.com/MananKakkar1} $|$
    \href{https://manankakkar.com}{manankakkar.com} \\
\end{center}

\section{Education}
  \resumeSubHeadingListStart
    \resumeSubheading
      {University of Toronto}{Toronto, Ontario}
      {Honours Bachelor of Science: Computer Science Specialist $|$ Co-op Program}{Expected 2028}
      \resumeItemListStart
        \resumeItem{\textbf{Relevant Coursework}: Operating Systems, Artificial Intelligence, Robotics, Networks \& Information Security, Data Structures \& Analysis, Systems Programming, Software Design, Software Engineering}
      \resumeItemListEnd
  \resumeSubHeadingListEnd

\section{Experience}
  \resumeSubHeadingListStart
    \resumeSubheading
      {Munafah.AI}{May 2025 -- Aug 2025}
      {Software Engineer Intern}{Remote}
      \resumeItemListStart
        \resumeItem{Developed and deployed dual-backend REST APIs (\textbf{Node.js}, \textbf{Flask}) with Firestore, enabling secure authentication and data processing for a real-time \textbf{B2B} messaging platform serving \textbf{100+} active users across \textbf{25+} organizations.}
        \resumeItem{Built an \textbf{AI-powered} moderation pipeline for a real-time messaging system, reducing manual triage by \textbf{60\%} and improving detection accuracy for harmful content.}
        \resumeItem{Implemented \textbf{unit and integration tests}, achieving \textbf{90\%+ coverage}, ensuring stable production rollouts.}
        \resumeItem{Engineered a \textbf{CI/CD} pipeline with branch protection and \textbf{Render} deployments, accelerating release cycles.}
      \resumeItemListEnd
  \resumeSubHeadingListEnd

\section{Projects}
  \resumeSubHeadingListStart
${projects.map((p) => {
  const projectLink = p.sourceUrl
    ? `\\href{${p.sourceUrl}}{\\underline{Github}}`
    : "";
  return `    \\resumeProjectHeading
      {\\textbf{${escapeLatex(p.title)}} $|$ \\emph{${escapeLatex(
        p.technologies || "Tech"
      )}}}{${projectLink}}
      \\resumeItemListStart
        \\resumeItem{${escapeLatex(p.latex_description || p.description || "")}}
      \\resumeItemListEnd`;
}).join("\n\n")}
  \resumeSubHeadingListEnd

\section{Technical Skills}
\begin{itemize}[leftmargin=0.15in, label={}]
  \small{\item{
    \textbf{Languages:} C, Python, Java, Bash, JavaScript/TypeScript, Go \\
    \textbf{Systems \& Infra:} Linux, Git, Github Actions \\
    \textbf{Frameworks/APIs:} Flask, Express.js, React, OpenCV, YOLOv5 \\
    \textbf{Databases \& Auth:} PostgreSQL, SQLite, MongoDB, Firebase, JWT \\
    \textbf{Testing:} GDB, Valgrind, PyTest, JUnit5, Jest \\
  }}
\end{itemize}

\section{Extracurriculars}
  \resumeSubHeadingListStart
    \resumeSubheading
      {ETA}{2025}
      {EmberHacks}{Mississauga, ON}
      \resumeItemListStart
        \resumeItem{\textbf{Won "Best Use of Auth0"} and achieved Top 4 at EmberHacks 2025 for building a personalized, interactive AI learning assistant.}
      \resumeItemListEnd
    \resumeSubheading
      {Netly}{2025}
      {SpurHacks}{Waterloo, ON}
      \resumeItemListStart
        \resumeItem{Built an \textbf{AI basketball referee} using \textbf{YOLOv5} and \textbf{OpenCV} to detect shots and movement at \textbf{30 FPS}.}
      \resumeItemListEnd
  \resumeSubHeadingListEnd

\end{document}
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
  <svg className="action-icon" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
  </svg>
);

const RemoveIcon = () => (
  <svg className="action-icon" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" />
  </svg>
);

const ResumeGenerator = () => {
  const [selected, setSelected] = useState("All");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const handlePreview = async () => {
    setIsLoading(true);
    setPdfUrl(null);

    const latex = latexTemplate(
      projectsList.filter((p: Project) => selectedProjects.includes(p.id))
    );

    const response = await fetch("https://latex.ytotech.com/builds/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: "xelatex",
        resources: [
          {
            main: true,
            content: latex,
          },
        ],
      }),
    });

    setIsLoading(false);

    if (!response.ok) {
      alert("Error generating PDF! Please check your LaTeX input.");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setShowModal(true);
  };

  // For download from the modal
  const handleModalDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "resume.pdf";
    a.click();
  };

  // Modal cleanup on close
  const handleModalClose = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setShowModal(false);
    setPdfUrl(null);
  };

  const handleDownload = async () => {
    const latex = latexTemplate(
      projectsList.filter((p: Project) => selectedProjects.includes(p.id))
    );

    const response = await fetch("https://latex.ytotech.com/builds/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler: "xelatex",
        resources: [
          {
            main: true,
            content: latex,
          },
        ],
      }),
    });

    if (!response.ok) {
      alert("Error generating PDF! Please check your LaTeX input.");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Manan Kakkar -- Resume.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="projects-page-background">
      <h1>Dynamic Resume Generator</h1>
      <h2 style={{ color: "var(--text)", marginBottom: "20px" }}>
        Add or Remove Projects to include in your version of my resume!
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
            <div className="gameboy-lines">
              <div className="gameboy-line"></div>
              <div className="gameboy-line"></div>
              <div className="gameboy-line"></div>
            </div>
            <div className="gameboy-screen">
              <img
                src={project.image || tempImg}
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
                  <div className="dpad-center"></div>
                  <div
                    className="dpad-up"
                    title="Navigate Up"
                  ></div>
                  <div
                    className="dpad-down"
                    title="Navigate Down"
                  ></div>
                  <div
                    className="dpad-left"
                    title="Navigate Left"
                  ></div>
                  <div
                    className="dpad-right"
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
              them in your version of my resume!
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
                    <img src={p.image || tempImg} alt={p.title} />
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

        <div className="download-section" style={{ display: "flex", gap: "1rem" }}>
          <button
            className="download-btn"
            onClick={handleDownload}
            disabled={selectedProjects.length === 0}
          >
            {selectedProjects.length === 0
              ? "Select Projects to Download"
              : `Download LaTeX Resume (${selectedProjects.length} projects)`}
          </button>
          <button
            className="download-btn"
            onClick={handlePreview}
            disabled={selectedProjects.length === 0 || isLoading}
          >
            {isLoading
              ? "Generating..."
              : selectedProjects.length === 0
              ? "Select Projects to Preview"
              : `Preview Resume (${selectedProjects.length} projects)`}
          </button>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showModal && pdfUrl && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleModalClose}
        >
          <div
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 0 24px #2226",
              maxWidth: "80vw",
              maxHeight: "80vh",
              position: "relative",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: 0 }}>Resume Preview</h2>
            <iframe
              src={pdfUrl}
              title="Resume PDF Preview"
              style={{
                width: "60vw",
                height: "70vh",
                border: "none",
                margin: "1rem 0",
                background: "#fafbfc",
              }}
            />
            <div style={{ textAlign: "right" }}>
              <button
                onClick={handleModalDownload}
                style={{
                  marginRight: "1rem",
                  padding: "0.5em 1.2em",
                  fontWeight: 600,
                  borderRadius: "6px",
                  background: "#2274d3",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Download PDF
              </button>
              <button
                onClick={handleModalClose}
                style={{
                  padding: "0.5em 1.2em",
                  fontWeight: 600,
                  borderRadius: "6px",
                  background: "#e34b3c",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeGenerator;

