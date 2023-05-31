import React from "react";
import { TwitterShareButton, TwitterIcon } from 'react-share';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import { Chess } from 'chess.js'

const chessSymbolMap = {
    'b': {
        'k': '♚',
        'q': '♛',
        'b': '♝',
        'n': '♞',
        'r': '♜',
        'p': '♟',
    },
    'w': {
        'k': '♔',
        'q': '♕',
        'b': '♗',
        'n': '♘',
        'r': '♖',
        'p': '♙',
    }
}

const chessToAscii = (chess) => {
    return chess.board().map(row => row.map(square => {
        if (!square) {
            return ' . ';
        }
        return chessSymbolMap[square.color][square.type];
    }).join('') + '\r\n').join('');
}

const ShareButton = ({positionFen}) => {
    const shareUrl = document.location.href;
    const chess = new Chess(positionFen);
    const positionAscii = chessToAscii(chess);
    const quote = 'Just solved the daily helpmate, check it out!\n' + positionAscii + '\n';

    return <Box>
        <Typography>Share</Typography>
        <TwitterShareButton
            url={shareUrl}
            title={quote}
        >
            <TwitterIcon size={32} round />
        </TwitterShareButton>
    </Box>
}

export default ShareButton;