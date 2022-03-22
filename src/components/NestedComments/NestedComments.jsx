import React from 'react'

export default function NestedComments({commentsArr}) {
    const commentMap = {};
    console.log(commentsArr);
    commentsArr.forEach(comment => commentMap[comment.commentId] = comment);
    console.log(commentMap);
    commentsArr.forEach(comment => {
        if(comment.parent !== null) {
            const parent = commentMap[comment.parent];
            (parent.children = parent.children || []).push(comment)
        }
    });
    
    const nestedComments = commentsArr.filter(comment => {
        return comment.parent === null;
    })
  return (
      <>
        {nestedComments.map((comment) => { return (
            <div key={comment.commentId}>
            <Comment key={comment.commentId}comment={comment} />
            </div>
        )})}
    </>  
  )
}
