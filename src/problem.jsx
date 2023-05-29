import React, { useState } from "react"
import HelpmateChessboard from "./board"
import MovesDisplay from "./moves";

const HelpmateProblem = ({ initialFen }) => {
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

    return <div>
        <HelpmateChessboard fen={currentFen} onLegalMove={handleMove} />
        <MovesDisplay moves={moves} totalMoveCount={4} />
        <button onClick={reset}>
            Reset
        </button>
    </div>
}

export default HelpmateProblem