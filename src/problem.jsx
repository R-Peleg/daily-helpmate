import React, { useEffect, useState } from "react"
import HelpmateChessboard from "./board"
import MovesDisplay from "./moves";
import { Chess } from 'chess.js'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const arrayOfEmptyArrays = (n) => {
    const arrayOfArrays = [];
    for (let i = 0; i < n; i++) {
      arrayOfArrays.push([]);
    }
    return arrayOfArrays;
  }
  
const HelpmateProblem = ({ initialFen, moveCount, solutions }) => {
    const [currentFen, setCurrentFen] = useState(initialFen);
    const [moves, setMoves] = useState(arrayOfEmptyArrays(solutions));
    const [currentSolution, setCurrentSolution] = useState(0);

    const handleMove = ({ fen, move }) => {
        setCurrentFen(fen);
        const newMoves = moves.slice();
        newMoves[currentSolution].push(move);
        setMoves(newMoves);
    }

    const reset = () => {
        setCurrentFen(initialFen);
        const newMoves = moves.slice();
        newMoves[currentSolution] = [];
        setMoves(arrayOfEmptyArrays(solutions));
    }

    const chess = new Chess(currentFen);
    const succeeded = chess.turn() === 'b' && chess.isCheckmate();
    const failed = !succeeded && (moves[currentSolution].length >= moveCount || chess.isGameOver());

    const handleNextSolutionClicked = () => {
        setCurrentSolution(currentSolution + 1);
        setCurrentFen(initialFen);
    }

    return <div>
        <Typography variant="h4" gutterBottom>
            Helpmate in {moveCount / 2} moves
        </Typography>
        <HelpmateChessboard fen={currentFen} allowMoves={!failed && !succeeded} onLegalMove={handleMove} />
        <Typography variant="body1" gutterBottom>
            {succeeded && (currentSolution === solutions - 1 ? "Success" : <>Found a solutions! <Button onClick={handleNextSolutionClicked}>Next</Button></>)}
            {failed && "Failed"}
            {!failed && !succeeded && "In progress"}
            </Typography>
        {Array.from(Array(solutions), (_, i) => 
            <MovesDisplay key={i} moves={moves[i]} totalMoveCount={moveCount} />
        )}
        <Button onClick={reset}>
            Reset
        </Button>
    </div>
}

export default HelpmateProblem