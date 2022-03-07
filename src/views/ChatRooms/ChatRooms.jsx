import React from 'react';
import { useEffect, useState } from 'react';
import { getAllBoards } from '../../services/fetch-utils';
import { Flex, Box, Button, spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function ChatRooms() {
  const [boards, setBoards] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const getBoards = async () => {
      const respBoards = await getAllBoards();
      setBoards(respBoards.body);
    };
    getBoards();
  }, []);

  return (
    <>
      <Button>ChatRooms</Button>
      {boards.map((board) => {
        return (
          <Box key={board.board_id} p="10px">
            <Link target={'_blank'} to={`/chat/${board.title}/${user.github}`}>
              <Button w="50%">Enter {board.title}'s chat room</Button>
            </Link>
          </Box>
        );
      })}
    </>
  );
}
