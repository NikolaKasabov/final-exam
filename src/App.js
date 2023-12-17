import classes from './App.module.css';
import FileLoader from './components/FileLoader/FileLoader';

function App() {
  return (
    <div className={classes.App}>
      <FileLoader className={classes['load-file']} />
    </div>
  );
}

export default App;
