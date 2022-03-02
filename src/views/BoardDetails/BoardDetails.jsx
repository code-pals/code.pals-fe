import { Box, Button, Input, Text, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteBoard, getBoardById } from '../../services/fetch-utils.js';
import BoardHomeBox from '../../components/BoardHomeBox/BoardHomeBox.jsx';
import { useUser } from '../../context/UserContext.js';
import { useHistory } from 'react-router-dom';
import BoardForm from '../../components/BoardForm/BoardForm.jsx';

export default function BoardDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const history = useHistory();

  const [board, setBoard] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const singleBoard = async () => {
      const returnBoard = await getBoardById(id);
      setBoard(returnBoard.body);
      setLoading(false);
    };
    singleBoard();
  }, [id]);

  const handleDelete = async () => {
    const answer = confirm('Are you sure you want to delete this Board?');
    if (answer) {
      const response = await deleteBoard(id);
      history.push('/');
    }
  };
  const handleEdit = async () => {
    setShowForm((prev) => !prev);
  };

  return (
    <>
      <BoardHomeBox board={board} goals={board.goal} />
      <Button onClick={handleDelete}>Delete Board</Button>
      <Button onClick={handleEdit}>Edit Board</Button>
      {showForm && <BoardForm />}
      <Link target={'_blank'} to={`/chat/${board.title}/${user.github}`}>
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
