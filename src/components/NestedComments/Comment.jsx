import React from 'react'

export default function Comment({comment}) {

    const nestedComments = (comment.children || []).map(comment => {
        return <Comment comment={comment} />
    })
  return (
<div> nested comments
    <div>{comment.comment}</div>
    <div>{comment.username}</div>
    <div>{comment.parent}</div>
    {nestedComments}
</div>
  )
}
