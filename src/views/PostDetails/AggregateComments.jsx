import React from 'react'

export default function AggregateComments([comments]) {
    console.log('aggcomp', comments);
  return (
    <div>{comments.map((comment) => {
        return (
        <div>{comment.comment}</div>
        )
    })}</div>
  )
}
