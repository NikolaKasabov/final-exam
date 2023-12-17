import { useContext, useRef } from 'react';
import { convertArrayToMatrix, convertStringToArray, getDate, isDateValid } from '../../utils/utils';
import { ProjectsContext } from '../../context/ProjectsContext';
import classes from './FileLoader.module.css';

function FileLoader({ className }) {
  const { setProjects } = useContext(ProjectsContext);
  const inputRef = useRef(null);

  function handleFileUpload(ev) {
    ev.preventDefault();

    const file = ev.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (readerEv) => {
      const data = readerEv.target.result;
      const arr = convertStringToArray(data);
      const matrix = convertArrayToMatrix(arr);

      // input data error checking 
      const errors = [];
      matrix.forEach((row, index) => {
        // check if number of the elements on each line is correct
        if (row.length !== 4) {
          errors.push(`Invalid data on line ${index + 1}.`);
        }

        // check if the dates(elements on positions 3 and 4) are in correct format
        for (let i = 2; i < 4; i++) {
          if (!isDateValid(row[i]) && row[i].toLowerCase() !== 'null') {
            errors.push(`Element on line ${index + 1}, position ${i + 1} must be a valid date.`);
          }
        }

        // check if the 'to' date is not before the 'from' date
        if (getDate(row[3]) - getDate(row[2]) < 0) {
          errors.push(`The end date is before the start date on line ${index + 1}.`);
        }
      });

      if (errors.length) {
        const message = errors.join('\n');
        alert(message);
        inputRef.current.value = null;
        return;
      }

      setProjects(matrix);
    }
  }

  return (
    <label className={`${classes['file-loader']} ${className}`}>
      <i className="fa-solid fa-cloud-arrow-up"></i> Choose file
      <input type="file" onChange={handleFileUpload} ref={inputRef} />
    </label>
  );

}

export default FileLoader;
