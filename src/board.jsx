import React from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const HelpmateChessboard = ({ fen, allowMoves, onLegalMove }) => {
    const chess = new Chess(fen);
    
    const handleMove = ({ sourceSquare, targetSquare }) => {
        let move = undefined;
        try {
            move = chess.move({
                from: sourceSquare,
                to: targetSquare,
            });
        } catch (e) {
            return; // Invalid move
        }
        onLegalMove({
            fen: chess.fen(),
            move,
        })
    };

    return (
        <div>
            <Chessboard
                position={fen}
                onDrop={handleMove}
                draggable={allowMoves}
            />
        </div>
    );
};

export default HelpmateChessboard;