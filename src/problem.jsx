import React, { useState } from "react"
import HelpmateChessboard from "./board"
import MovesDisplay from "./moves";
import { Chess } from 'chess.js'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const HelpmateProblem = ({ initialFen, moveCount }) => {
    const [currentFen, setCurrentFen] = useState(initialFen);
    const [moves, setMoves] = useState([]);

    const handleMove = ({ fen, move }) => {
        setCurrentFen(fen);
        setMoves(moves.concat(move));
    }

    const reset = () => {
        setCurrentFen(initialFen);
        setMoves([]);
    }

    const chess = new Chess(currentFen);
    const succeeded = chess.turn() === 'b' && chess.isCheckmate();
    const failed = !succeeded && (moves.length >= moveCount || chess.isGameOver());

    return <div>
        <Typography variant="h4" gutterBottom>
            Helpmate in {moveCount / 2} moves
        </Typography>
        <HelpmateChessboard fen={currentFen} allowMoves={!failed && !succeeded} onLegalMove={handleMove} />
        <MovesDisplay moves={moves} totalMoveCount={moveCount} />
        <Typography variant="body1" gutterBottom>

            {
                succeeded ? "Success" :
                    failed ? "Failed" :
                        "In progress"
            }
        </Typography>
        <Button onClick={reset}>
            Reset
        </Button>
    </div>
}

export default HelpmateProblem