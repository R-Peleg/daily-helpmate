import React from "react"


const moveDivStyle = {
    width: '100px',
    height: '40px',
    backgroundColor: 'rgb(220, 220, 220)',
    color: 'black',
    margin: '5px',
}

const moveContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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

const splitToPairs = (array) => array.reduce((accumulator, currentValue, index) => {
    if (index % 2 === 0) {
        accumulator.push([currentValue, array[index + 1]]);
    }

    return accumulator;
}, []);

const MovesDisplay = ({ moves, totalMoveCount }) => {
    const emptySpaces = Math.max(0, totalMoveCount - moves.length);
    const firstMovePlaceholder = totalMoveCount % 2 == 0 ? [<div style={moveDivStyle}>...</div>] : [];
    const movesDivs = moves.map(m => <div style={moveDivStyle}>{toPieceSymbol(m.san)}</div>);
    const emptySpacesDiv = Array.from(Array(emptySpaces), () => <div style={moveDivStyle}></div>);
    const allDivs = firstMovePlaceholder.concat(movesDivs, emptySpacesDiv)
    const divPairs = splitToPairs(allDivs)
    return <div style={moveContainerStyle}>
        {divPairs.map((pair, idx) => <>
            {idx + 1}.
            {pair[0]}
            {pair[1]}
        </>)}
    </div>
};

export default MovesDisplay;