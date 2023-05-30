import React, { useState } from "react"
import HelpmateChessboard from "./board"
import MovesDisplay from "./moves";
import { Chess } from 'chess.js'

const rootDivStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    width: 'auto'
}

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
        <h2>Helpmate in {moveCount / 2} moves</h2>
        <HelpmateChessboard fen={currentFen} allowMoves={!failed && !succeeded} onLegalMove={handleMove} />
        <MovesDisplay moves={moves} totalMoveCount={moveCount} />
        <p>
            {
                succeeded ? "Success" :
                failed ? "Failed" :
                "In progress"
            }
        </p>
        <button onClick={reset}>
            Reset
        </button>
    </div>
}

export default HelpmateProblem