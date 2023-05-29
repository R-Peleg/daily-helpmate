import React from "react"


const moveDivStyle = {
    width: '100px',
    height: '40px',
    backgroundColor: 'rgb(220, 220, 220)',
    margin: '5px',
}

const moveContainerStyle = {
    display: 'flex', flexDirection: 'row'
}

const toPieceSymbol = (san) => {
    const pieceToSymbol = {
        'R': '♜',
        'N': '♞',
        'B': '♝',
        'Q': '♛',
        'K': '♚',
    }
    return san.replace(/[RNBQK]/g, (char) => {
        return pieceToSymbol[char];
    });
}

const MovesDisplay = ({moves, totalMoveCount}) => {
    const emptySpaces = Math.max(0, totalMoveCount - moves.length);
    return <div style={moveContainerStyle}>
        {moves.map(m => <div style={moveDivStyle}>{toPieceSymbol(m.san)}</div>)}
        {Array.from(Array(emptySpaces), () => <div style={moveDivStyle}></div>)}
    </div>
};

export default MovesDisplay;