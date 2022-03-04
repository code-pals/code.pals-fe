import React from 'react';
import { Box, Button, Avatar, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export default function CommentBox({ comment }) {
  return (
    <>
      <Box border="1px" padding="5px" rounded={'md'}>
        <Avatar src={comment?.avatar} alt={'Author'} />
        <br />
        <Box>Comment: {comment.comment}</Box>
        <br />
        <Box>By: {comment?.github}</Box>
        <Box>{comment?.created?.slice(0, 10)}</Box>
        <Link to={`/postdetails/${comment.postId}`}>
          <Button >Link to Post</Button>
        </Link>
      </Box>
    </>
  );
}
