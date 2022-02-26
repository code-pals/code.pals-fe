import React from 'react'

export default function CommentBox({comment}) {
  return (
      <>
    <div>{comment.comment}</div><br/>
    <div>By: {comment.username}</div>
    <div>{comment.created}</div>
    </>
  )
}
