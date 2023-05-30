import HelpmateProblem from './problem'

//const fen = '8/8/8/8/8/3NBK1k/8/4b3 b - - 0 1'
const fen = '4B3/8/6R1/8/7K/8/4p2k/8 b - - 0 1'
const problemJson = {
  'fen': '8/8/2K5/8/3k4/8/Q3p3/6N1 b - - 0 1',
  'moves': 2,
  'solutions': 3,
}

function App() {
  return (
    <HelpmateProblem initialFen={problemJson.fen} moveCount={problemJson.moves * 2} solutions={problemJson.solutions}/>
  );
}

export default App;
