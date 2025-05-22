import { useState } from "react";
import { projectsList } from "./Projects.tsx";
import type { Project } from "./Projects.tsx";
import "../components/css_files/Projects.css";
import "../components/css_files/ResumeGenerator.css";

const latexTemplate = (projects: typeof projectsList) => `
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
\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}
\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]
\\pdfgentounicode=1
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeProjectHeading}[1]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 \\\\
    \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}

\\begin{document}

%----------HEADING----------
\\begin{center}
    \\textbf{\\Huge \\scshape Manan Kakkar} \\\\ \\vspace{1pt}
    \\small \\href{mailto:manan.kakkar.2005@outlook.com}{manan.kakkar.2005@outlook.com} \$|$ 416-705-7631 \$|$ Oakville, Ontario, Canada \\\\
    \\href{https://www.linkedin.com/in/manankakkar11}{\\underline{LinkedIn}}
    \\href{https://github.com/MananKakkar1}{\\underline{GitHub}} \\\\
\\end{center}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {University of Toronto Mississauga}{Mississauga, Ontario}
      {Honours Bachelor of Science: Computer Science Specialist}{Expected June 2028}
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

const ResumeGenerator = () => {
  const [selected, setSelected] = useState("All");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const categories = getCategories();

  const filteredProjects =
    selected === "All"
      ? projectsList
      : projectsList.filter((p: Project) => p.category === selected);

  const handleProjectClick = (id: string) => {
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
      <label className="category-filter">
        Filter by category:{" "}
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {(categories as string[]).map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </label>
      <div className="projects-list">
        {filteredProjects.map((project: Project) => (
          <div
            key={project.id}
            className="project-entry"
            onClick={() => handleProjectClick(project.id)}
            title={
              selectedProjects.includes(project.id)
                ? "Click to remove from resume"
                : "Click to add to resume"
            }
          >
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              <strong>Technologies:</strong> {project.technologies}
            </p>
            {selectedProjects.includes(project.id) && (
              <div>Added to Resume (click to remove)</div>
            )}
          </div>
        ))}
      </div>
      <h2 style={{ marginTop: 40 }}>Projects in Resume</h2>
      {selectedProjects.length === 0 ? (
        <p>No projects selected yet.</p>
      ) : (
        <div className="projects-list">
          {projectsList
            .filter((p: Project) => selectedProjects.includes(p.id))
            .map((p: Project) => (
              <div
                key={p.id}
                className="project-entry"
                onClick={() => handleProjectClick(p.id)}
                title="Click to remove from resume"
              >
                <img src={p.image} alt={p.title} />
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <p>
                  <strong>Technologies:</strong> {p.technologies}
                </p>
                <div>Click to remove</div>
              </div>
            ))}
        </div>
      )}
      <button
        className="download-btn"
        onClick={handleDownload}
        disabled={selectedProjects.length === 0}
      >
        Download LaTeX (.tex)
      </button>
      <p className="latex-info" style={{ marginTop: 24 }}>
        You can compile the downloaded <code>.tex</code> file using Overleaf or
        your local LaTeX installation.
      </p>
    </div>
  );
};

export default ResumeGenerator;
