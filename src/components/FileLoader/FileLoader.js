import { useContext, useRef } from 'react';
import { convertArrayToMatrix, convertStringToArray } from '../../utils/utils';
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

      // error checking
      const errors = [];
      matrix.forEach((row, index) => {
        if (row.length !== 4) {
          errors.push(`Invalid data on line ${index + 1}`);
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
