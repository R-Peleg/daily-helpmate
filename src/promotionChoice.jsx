import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChessQueen, faChessRook,
    faChessBishop, faChessKnight
} from '@fortawesome/free-solid-svg-icons'

const PromotionChoice = ({onSelected}) => {
    return <div>
        <button onClick={() => onSelected('q')}><FontAwesomeIcon icon={faChessQueen}/></button>
        <button onClick={() => onSelected('r')}><FontAwesomeIcon icon={faChessRook}/></button>
        <button onClick={() => onSelected('b')}><FontAwesomeIcon icon={faChessBishop}/></button>
        <button onClick={() => onSelected('n')}><FontAwesomeIcon icon={faChessKnight}/></button>
    </div>
};

export default PromotionChoice;
