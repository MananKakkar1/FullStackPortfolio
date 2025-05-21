let projectsList = [
  {
    title: "Chess Game",
    description:
      "A simple chess game built with HTML, CSS, JavaScript, and Python.",
    image: "./images/temp.jpg",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website built using React, TypeScript, and modern web technologies to showcase my skills and projects.",
    image: "./images/temp.jpg",
  },
];

const projects = () => {
  return (
    <div>
      <h2>My Projects</h2>
      <div>
        {projectsList.map((project, idx) => (
          <div key={idx}>
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default projects;
