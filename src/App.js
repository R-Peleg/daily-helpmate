import './App.css';
import HelpmateProblem from './problem'

const fen = '8/8/8/8/8/3NBK1k/8/4b3 b - - 0 1'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HelpmateProblem initialFen={fen}/>
      </header>
    </div>
  );
}

export default App;
