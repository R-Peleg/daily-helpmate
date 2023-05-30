import HelpmateProblem from './problem'

//const fen = '8/8/8/8/8/3NBK1k/8/4b3 b - - 0 1'
const fen = '4B3/8/6R1/8/7K/8/4p2k/8 b - - 0 1'

function App() {
  return (
    <HelpmateProblem initialFen={fen} moveCount={4}/>
  );
}

export default App;
