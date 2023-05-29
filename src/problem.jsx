import React, { useState } from "react"
import HelpmateChessboard from "./board"

const HelpmateProblem = ({ initialFen }) => {
    const [currentFen, setCurrentFen] = useState(initialFen);
    const handleMove = ({ fen, move }) => {
        setCurrentFen(fen);
    }

    return <div>
        <HelpmateChessboard fen={currentFen} onLegalMove={handleMove} />
        <button onClick={() => setCurrentFen(initialFen)}>
            Reset
        </button>
    </div>
}

export default HelpmateProblem