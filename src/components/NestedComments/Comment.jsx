import React from 'react'
import { Box, Avatar, Flex } from '@chakra-ui/react'

export default function Comment({comment}) {
  // console.log('Comment', comment)
    const nestedComments = (comment.children || []).map(comment => {
        return <Comment comment={comment} />
    })
    // console.log('CommentComp.children', comment)
  return (
<Box border='1px solid red'> 
    
    <Avatar src={comment.avatar} />
    <div>Comment ID: {comment.commentId}</div>
    <div>Parent Comment: {comment.parent}</div>
    <div>Comment: {comment.comment}</div><br/>
    <br/>
    <div></div>
    nested comments:
     <Box ml='55px' >{nestedComments}</Box>
</Box>
  )
}
