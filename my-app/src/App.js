import logo from './logo.svg';
import './App.css';

function App() {

  const currenturl = window.location.href;
  // slice by /  and get all but the last element
  const currentpath = currenturl.split('/').slice(0, -1).join('/');


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a href="../OSD2014/">OSD 2014</a>
        <a href="../../OSD2014/">OSD 2014 double ../</a>
        <a href={currentpath + "OSD2014"}>OSD2014 third try</a>
      </header>
    </div>
  );
}

export default App;
