import { Outlet } from 'react-router-dom';
import classes from './App.module.css';
import FileLoader from './components/FileLoader/FileLoader';
import { useContext } from 'react';
import { ProjectsContext } from './context/ProjectsContext';
import Filter from './components/Filter/Filter';

function App() {
  const { projects } = useContext(ProjectsContext);

  return (
    <div className={classes.App}>
      <FileLoader className={classes['load-file']} />
      {projects.length === 0 && <p className={classes['select-file']}>Please select a file.</p>}
      {projects.length > 0 && <Filter />}
      <Outlet />
    </div>
  );
}

export default App;
