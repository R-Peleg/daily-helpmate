import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChessQueen, faChessRook,
    faChessBishop, faChessKnight
} from '@fortawesome/free-solid-svg-icons'

const PromotionChoice = ({onSelected}) => {
    return <div>
        <button onClick={() => onSelected('q')}><FontAwesomeIcon icon={faChessQueen} size='8x'/></button>
        <button onClick={() => onSelected('r')}><FontAwesomeIcon icon={faChessRook} size='8x'/></button>
        <button onClick={() => onSelected('b')}><FontAwesomeIcon icon={faChessBishop} size='8x'/></button>
        <button onClick={() => onSelected('n')}><FontAwesomeIcon icon={faChessKnight} size='8x'/></button>
    </div>
};

export default PromotionChoice;
