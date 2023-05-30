import React, {useState} from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import PromotionChoice from './promotionChoice';

const HelpmateChessboard = ({ fen, allowMoves, onLegalMove }) => {
    const chess = new Chess(fen);
    const [pendingPromotion, setPendingPromotion] = useState(undefined)
    
    const handleMove = ( sourceSquare, targetSquare, sourcePiece, promotion=undefined ) => {
        // Check for promotion
        const targetRow = targetSquare[1];
        const promotionRow = chess.turn() === 'w' ? '8' : '1';
        if (sourcePiece[0] === chess.turn() &&
            sourcePiece[1] === 'P' &&
            targetRow === promotionRow &&
            promotion === undefined) {
                setPendingPromotion({sourceSquare, targetSquare, sourcePiece})
                return;
        }

        let move = undefined;
        try {
            move = chess.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: promotion
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
                onPieceDrop={handleMove}
                draggable={allowMoves}
            />
            {pendingPromotion && <PromotionChoice onSelected={
                p => {
                    setPendingPromotion(undefined);
                    handleMove(pendingPromotion.sourceSquare, pendingPromotion.targetSquare, pendingPromotion.sourcePiece, p);
                }
                }/>}
        </div>
    );
};

export default HelpmateChessboard;