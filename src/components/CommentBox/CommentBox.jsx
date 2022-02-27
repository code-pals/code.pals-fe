import React from 'react'
import { Box, Button, Avatar, Input } from '@chakra-ui/react';

export default function CommentBox({comment}) {
  return (
      <>
    <Avatar src={comment.avatar} alt={'Author'} /><br/>
    <div>{comment.comment}</div><br/>
    <div>By: {comment.github}</div>
    <div>{comment.created}</div>

    </>
  )
}
