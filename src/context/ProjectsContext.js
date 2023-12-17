import { createContext, useState } from 'react';

export const ProjectsContext = createContext({
  projects: [],
  setProjects: () => { },
});

function ProjectsContextProvider({ children }) {
  const [projects, setProjects] = useState([]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export default ProjectsContextProvider;
