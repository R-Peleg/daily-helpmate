import React from 'react';
import Chessboard from 'chessboardjsx';

const HelpmateChessboard = () => {
  const handleMove = ({ from, to }) => {
    // Handle move logic here
  };

  return (
    <div>
      <Chessboard
        position="start"
        onDrop={handleMove}
      />
    </div>
  );
};

export default HelpmateChessboard;