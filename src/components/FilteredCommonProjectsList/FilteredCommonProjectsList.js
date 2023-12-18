import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext';
import CommonProjectsItem from '../CommonProjectsItem/CommonProjectsItem';
import classes from './FilteredCommonProjectsList.module.css';

function FilteredCommonProjectsList() {
  const { unfilteredData } = useContext(ProjectsContext);
  const params = useParams();
  const navigate = useNavigate();

  const employeesIds = params.id;
  const data = unfilteredData[employeesIds];

  useEffect(() => {
    // navigate to the root url if the user tryes to open url with incorrect id
    if (!unfilteredData.hasOwnProperty(employeesIds)) {
      navigate('/');
    }
  }, [employeesIds, navigate, unfilteredData]);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Filtered projects list</h2>
      <ul>
        {data && <CommonProjectsItem employeesIds={employeesIds} data={data} />}
      </ul>
    </div>
  );
}

export default FilteredCommonProjectsList;
