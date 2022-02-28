import { Box, Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  createComment,
  getCommentsByBoard,
  getBoardById,
} from '../../services/fetch-utils.js';

export default function BoardDetails() {
  const { id } = useParams();

  const [board, setBoard] = useState('');
  const [loading, setLoading] = useState(true);
  // const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const singleBoard = async () => {
      const returnBoard = await getBoardById(id);
      console.log('RETURNBOARD', returnBoard);
      setBoard(returnBoard.body);
      setLoading(false);
    };
    singleBoard();
  }, [id]);
  console.log('BOARDBOARD', board);

  // useEffect(() => {
  //   const commentFunc = async () => {
  //     const returnComments = await getCommentsByBoard(id);
  //     console.log('RETURNCOMMENtS', returnComments);
  //     setComments(returnComments.body);
  //   };
  //   commentFunc();
  // }, [comments]);

  // async function commentSubmit(e) {
  //   e.preventDefault();
  //   const commentObj = {
  //     commenter: board.created_by,
  //     board_id: board.board_id,
  //     comment: newComment,
  //     parent: null,
  //     favorited: false,
  //   };
  //   const response = await createComment(commentObj);
  //   console.log('RESPONSEOBJ', response);
  // }
  return (
    <>
      <Box>
        {board.title}
        <br />
        {board.summary}
        <br />
        {board.goal}
        <br />
        {board.group_size}
        <br />
        {/* <form onSubmit={commentSubmit}>
          <Input
            type="text"
            placeholder="Comments"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></Input>
          <Button type="submit">Button</Button>
        </form> */}
        {/* <br />
        {comments.map((comment) => {
          return <div>{comment.comment}</div>;
        })} */}
      </Box>
    </>
  );
}
