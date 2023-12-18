import { useMemo } from 'react';
import classes from './CommonProjectsItem.module.css';
import { getDaysNumbersSum } from '../../utils/utils';

function CommonProjectsItem({ employeesIds, data }) {
  const [emp1Id, emp2Id] = employeesIds.split(',');

  const daysNumberSum = useMemo(() => {
    return getDaysNumbersSum(data);
  }, [data]);

  return (
    <li className={classes.container}>
      <p>Employees with ids: <span>{emp1Id}</span> and <span>{emp2Id}</span> have worked together for <span>{daysNumberSum}</span> days, on the following projects:</p>
      <ul>
        {Object.entries(data).map(el => {
          const [projectId, days] = el;
          return <li key={projectId}>- project <span>{projectId}</span>: <span>{days}</span> days</li>
        })}
      </ul>
    </li>
  );
}

export default CommonProjectsItem;
