import HelpmateProblem from './problem'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

const problemJsons = [
  {
    'author': 'Kárpáti, Aurél Miklós',
    'year': 1958,
    'fen': '8/8/2K5/8/3k4/8/Q3p3/6N1 b - - 0 1',
    'moves': 2,
    'solutions': 3,
  },
  {
    'author': 'Bakcsi, György',
    'year': 1966,
    'fen': '8/8/8/4bN2/8/r5N1/4n1pp/1K1b2nk b - - 0 1',
    'moves': 2,
    'solutions': 3,
  },
  {
    'author': 'Darvas, Róbert',
    'year': 1953,
    'fen': '7B/p4p2/4pPpp/4P1kb/3pP1p1/2pP2P1/K1P5/8 b - - 0 1',
    'moves': 5,
    'solutions': 1,
  }
]

function App() {
  const [problemIdx, setProblemIdx] = useState(0);
  const handleChange = (event) => {
    setProblemIdx(event.target.value);
  };

  const problemJson = problemJsons[problemIdx];
  return (<>
    <Select
      value={problemIdx}
      onChange={handleChange}
      >
        <MenuItem value={0}>Promotions, multi solution</MenuItem>
        <MenuItem value={1}>Black starts with check</MenuItem>
        <MenuItem value={2}>H#5, stalemates</MenuItem>
    </Select>
    <HelpmateProblem initialFen={problemJson.fen} moveCount={problemJson.moves * 2} solutions={problemJson.solutions} />
  </>
  );
}

export default App;
