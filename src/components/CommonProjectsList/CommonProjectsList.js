import { useContext } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext';
import classes from './CommonProjectsList.module.css';
import CommonProjectsItem from '../CommonProjectsItem/CommonProjectsItem';

function CommonProjectsList() {
  const { unfilteredData } = useContext(ProjectsContext);

  if (Object.keys(unfilteredData).length === 0) {
    return null;
  }

  return (
    <ul className={classes.container}>
      <h2>Projects list</h2>
      {Object.entries(unfilteredData).map(arr => {
        return <CommonProjectsItem key={arr[0]} employeesIds={arr[0]} data={arr[1]} />
      })}
    </ul>
  );
}

export default CommonProjectsList;
