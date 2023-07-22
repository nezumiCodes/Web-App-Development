import './styles/App.css';
import Welcome from './pages/Welcome';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Welcome name='Celia'/>
        <Home />
        <h1>Hello World!</h1>
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
      </header>
    </div>
  );
}

export default App;
