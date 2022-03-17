import {
  Box,
  Button,
  Input,
  Text,
  Center,
  ButtonGroup,
} from '@chakra-ui/react';
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

  useEffect(() => {
    const editedBoard = async () => {
      const returnBoard = await getBoardById(id);
      setBoard(returnBoard.body);
    };
    editedBoard();
  }, [showForm]);
 

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
      <Center>
        <ButtonGroup spacing="5">
          {user.github === board.github && (
            <Button onClick={handleDelete} mb="10px">
              Delete Board
            </Button>
          )}
          {user.github === board.github && (
            <Button onClick={handleEdit} mb="10px">
              Edit Board
            </Button>
          )}
        </ButtonGroup>
      </Center>
      {showForm && <BoardForm setShowForm={setShowForm}/>}
      <Center>
        {user.github ? (
          <Link target={'_blank'} to={`/chat/${board.title}/${user.github}`}>
            <Button>Enter Chat!</Button>
          </Link>
        ) : (
          <Link to={'/login'}>
            <Button>Log in to join the chatroom</Button>
          </Link>
        )}
      </Center>
    </>
  );
}
