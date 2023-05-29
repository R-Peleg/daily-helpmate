import React, { useState } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const HelpmateChessboard = () => {
    const [chess, setChess] = useState(new Chess('8/8/8/8/8/3NBK1k/8/4b3 b - - 0 1'));
    
    const handleMove = ({ sourceSquare, targetSquare }) => {
        let chessCopy = new Chess(chess.fen())
        try {
            chessCopy.move({
                from: sourceSquare,
                to: targetSquare,
            });
        } catch (e) {
            return; // Invalid move
        }
        setChess(chessCopy)
    };

    return (
        <div>
            <Chessboard
                position={chess.fen()}
                onDrop={handleMove}
            />
        </div>
    );
};

export default HelpmateChessboard;