import { Box, Button, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBoardById } from '../../services/fetch-utils.js';
import BoardHomeBox from '../../components/BoardHomeBox/BoardHomeBox.jsx';

export default function BoardDetails() {
  const { id } = useParams();

  const [board, setBoard] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const singleBoard = async () => {
      const returnBoard = await getBoardById(id);
      setBoard(returnBoard.body);
      setLoading(false);
    };
    singleBoard();
  }, [id]);

  return (
    <>
      <BoardHomeBox board={board} />
      {/* {board.title}
        {board.summary}
        {board.goal}
        {board.group_size} */}
    </>
  );
}
