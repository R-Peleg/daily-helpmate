import React, { useState, useEffect } from "react"
import HelpmateChessboard from "./board"
import MovesDisplay from "./moves";
import { Chess } from 'chess.js'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ShareButton from "./share";
import HelpButton from "./helpButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle
} from '@fortawesome/free-solid-svg-icons'

const arrayOfEmptyArrays = (n) => {
    const arrayOfArrays = [];
    for (let i = 0; i < n; i++) {
      arrayOfArrays.push([]);
    }
    return arrayOfArrays;
  }
  
const HelpmateProblem = ({ initialFen, moveCount, solutions, variants, author, year }) => {
    if (!Number.isInteger(moveCount)) {
        throw new Error(`Invalid move count ${moveCount}`);
    }
    const [currentFen, setCurrentFen] = useState(undefined);
    const [moves, setMoves] = useState(arrayOfEmptyArrays(solutions));
    const [currentSolution, setCurrentSolution] = useState(0);
    let currentSolutionFen = initialFen;
    if (currentSolution > 0 && variants) {
        currentSolutionFen = variants[currentSolution - 1];
    }

    useEffect(() => {
        setMoves(arrayOfEmptyArrays(solutions));
        setCurrentSolution(0);
    }, [initialFen, solutions]);

    useEffect(() => {
        setCurrentFen(currentSolutionFen);
    }, [currentSolutionFen]);

    const handleMove = ({ fen, move }) => {
        setCurrentFen(fen);
        const newMoves = moves.slice();
        newMoves[currentSolution].push(move);
        setMoves(newMoves);
    }

    const reset = () => {
        setCurrentFen(currentSolutionFen);
        const newMoves = moves.slice();
        newMoves[currentSolution] = [];
        setMoves(newMoves);
    }

    let repeatedSolution = false;
    for (let i = 0; i < currentSolution; i++) {
        if (JSON.stringify(moves[i]) === JSON.stringify(moves[currentSolution])) {
            repeatedSolution = true;
        }
    }
    const chess = new Chess(currentFen);
    const succeeded = !repeatedSolution && chess.turn() === 'b' && chess.isCheckmate();
    const failed = !repeatedSolution && !succeeded && (moves[currentSolution].length >= moveCount || chess.isGameOver());
    const inProgress = !succeeded && ! failed && !repeatedSolution;
    const succeededAll = succeeded && currentSolution === solutions - 1;

    const handleNextSolutionClicked = () => {
        setCurrentSolution(currentSolution + 1);
        setCurrentFen(initialFen);
    }

    return <div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography variant="h4" gutterBottom>
                Helpmate in {moveCount / 2} moves
            </Typography>
            <HelpButton/>
        </div>
        <Typography variant="subtitle1" gutterBottom>
            Author: {author}, {year}
        </Typography>
        <HelpmateChessboard fen={currentFen} allowMoves={inProgress} onLegalMove={handleMove} />
        {inProgress && <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <div style={{
                width: '25px',
                height: '25px',
                borderRadius: "50%",
                borderColor: 'black',
                borderWidth: '1px',
                borderStyle: 'solid',
                backgroundColor: chess.turn() === 'w' ? 'white' : 'black',
                }}/>
            <Typography>{chess.turn() === 'b' ? "Black to move" : "White to move" }</Typography>
        </div>
        }
        <Typography variant="body1" gutterBottom>
            {repeatedSolution && "This solution was already found"}
            {succeeded && (succeededAll ? "Success" : <>Found a solution! <Button onClick={handleNextSolutionClicked}>Next</Button></>)}
            {failed && <span>Failed <Button onClick={reset}>Try again</Button></span>}
            {inProgress && "In progress"}
            </Typography>
        {moves.map((moveArr, i) => {
            const status = i < currentSolution ? 'success' :
                i > currentSolution ? 'pending' :
                succeeded ? 'success' :
                failed ? 'failed' : 'in_progress';
            return <MovesDisplay key={i} moves={moveArr} totalMoveCount={moveCount} status={status} />
        })}
        <Button onClick={reset}>
            Reset
        </Button>
        {succeededAll && <div>
            <Typography>Solved the problem!</Typography>
            <ShareButton positionFen={initialFen} />
        </div>}
    </div>
}

export default HelpmateProblem