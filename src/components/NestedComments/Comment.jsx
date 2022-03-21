import React from 'react'
import { Avatar, Flex } from '@chakra-ui/react'

export default function Comment({comment}) {

    const nestedComments = (comment.children || []).map(comment => {
        return <Comment comment={comment} />
    })
  return (
<Box> 
    
    <Avatar src={comment.avatar} />
    <div>User: {comment.github}</div><br/>
    <div>Comment: {comment.comment}</div><br/>
    <div>Parent Comment: {comment.parent}</div><br/>
    <div></div>
    <div>Comment ID: {comment.commentId}</div>
    nested comments: {nestedComments}
</Box>
  )
}
