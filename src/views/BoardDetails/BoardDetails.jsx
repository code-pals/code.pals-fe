import { Box, Button, Input, Text, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBoardById } from '../../services/fetch-utils.js';
import BoardHomeBox from '../../components/BoardHomeBox/BoardHomeBox.jsx';
import { useUser } from '../../context/UserContext.js';

export default function BoardDetails() {
  const { id } = useParams();
  const { user } = useUser();

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
      <BoardHomeBox board={board} goals={board.goal} />
      <Link to={`/chat/${board.title}/${user.github}`}>
        <Center>
          <Button>Enter Boardroom!</Button>
        </Center>
      </Link>
      {/* {board.title}
        {board.summary}
        {board.goal}
        {board.group_size} */}
    </>
  );
}
