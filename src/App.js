import { Outlet } from 'react-router-dom';
import classes from './App.module.css';
import FileLoader from './components/FileLoader/FileLoader';
import { useContext } from 'react';
import { ProjectsContext } from './context/ProjectsContext';
import { getUnfilteredData } from './utils/utils';

function App() {
  const { projects, unfilteredData} = useContext(ProjectsContext);

  console.log(unfilteredData);

  return (
    <div className={classes.App}>
      <FileLoader className={classes['load-file']} />
      <Outlet />
    </div>
  );
}

export default App;
