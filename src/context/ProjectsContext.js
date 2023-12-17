import { createContext, useMemo, useState } from 'react';
import { getUnfilteredData } from '../utils/utils';

export const ProjectsContext = createContext({
  projects: [],
  setProjects: () => { },
  unfilteredData: {},
});

function ProjectsContextProvider({ children }) {
  const [projects, setProjects] = useState([]);

  const unfilteredData = useMemo(() => { 
    return getUnfilteredData(projects);
  }, [projects]);

  return (
    <ProjectsContext.Provider value={{ projects, setProjects, unfilteredData }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export default ProjectsContextProvider;
