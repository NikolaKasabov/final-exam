import { Outlet } from 'react-router-dom';
import classes from './App.module.css';
import FileLoader from './components/FileLoader/FileLoader';
import { useContext } from 'react';
import { ProjectsContext } from './context/ProjectsContext';

function App() {
  const { projects, unfilteredData} = useContext(ProjectsContext);

  return (
    <div className={classes.App}>
      <FileLoader className={classes['load-file']} />
      {projects.length === 0 && <p className={classes['select-file']}>Please select a file.</p>}
      <Outlet />
    </div>
  );
}

export default App;
