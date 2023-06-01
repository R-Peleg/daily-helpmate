import React from "react";
import { TwitterIcon } from 'react-share';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import { Chess } from 'chess.js'

// Copied from https://github.com/neondatabase/devdays2/pull/2/files
const objectToGetParams = (object) => {
    const params = Object.entries(object)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
 
    return params.length > 0 ? `?${params.join('&')}` : '';
  };
 
  const getBoxPositionOnWindowCenter = (width, height) => ({
    left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
    top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2,
  });
 
  const windowOpen = (url, { width, height, ...configRest }) => {
    const config = {
      width,
      height,
      location: 'no',
      toolbar: 'no',
      status: 'no',
      directories: 'no',
      menubar: 'no',
      scrollbars: 'yes',
      resizable: 'no',
      centerscreen: 'yes',
      chrome: 'yes',
      ...configRest,
    };
 
    return window.open(
      url,
      '',
      Object.keys(config)
        .map((key) => `${key}=${config[key]}`)
        .join(', ')
    );
  };
 
const handleTwitterShare = (event, url, text) => {
    const link = `https://twitter.com/intent/tweet${objectToGetParams({
      url,
      text,
    })}`;

    const windowConfig = {
      width: 550,
      height: 400,
      ...getBoxPositionOnWindowCenter(550, 400),
    };

    event.preventDefault();

    windowOpen(link, windowConfig);
};


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
    const quote = 'Just solved the daily helpmate!\n' + positionAscii + '\n';

    return <Box>
        <Typography>Share</Typography>
        <button
           className="transition duration-200 lg:px-8 xs:py-2 xs:px-3"
           type="button"
           size="sm"
           theme="code-copy"
           onClick={event => handleTwitterShare(event, shareUrl, quote)}
         >
            <TwitterIcon size={32} round />
        </button>
    </Box>
}

export default ShareButton;