import { useContext, useState } from 'react';
import classes from './Filter.module.css';
import { ProjectsContext } from '../../context/ProjectsContext';
import { useNavigate } from 'react-router-dom';

function Filter() {
  const [selectValue, setSelectValue] = useState('all');
  const { unfilteredData } = useContext(ProjectsContext);
  const navigate = useNavigate();

  const options = Object.keys(unfilteredData);

  function handleChange(ev) {
    const value = ev.target.value;
    setSelectValue(value);
    if (value === 'all') {
      navigate('/');
    } else {
      navigate(`/filtered/${value}`);
    }
  }

  return (
    <div className={classes.container}>
      <label>
        Filter by employees ids
        <select onChange={handleChange} value={selectValue}>
          <option value="all">All</option>
          {options.map(option => {
            return <option key={option} value={option}>{option}</option>
          })}
        </select>
      </label>
    </div>
  );
}

export default Filter;
