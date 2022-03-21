import React from 'react'
import { useState, useEffect } from 'react';
import { getCommentsByPost } from '../../services/fetch-utils';
import Comment from './Comment';

export default function NestedComments({ id }) {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        async function getComments() {
        const returnComments = await getCommentsByPost(id);
        setComments(returnComments.body);}
    getComments()}, [])
    
    const commentMap = {};
    console.log(comments);
    comments.forEach(comment => commentMap[comment.commentId] = comment);
    console.log(commentMap);
    comments.forEach(comment => {
        if(comment.parent !== null) {
            const parent = commentMap[comment.parent];
            (parent.children = parent.children || []).push(comment)
        }
    });
    
    const nestedComments = comments.filter(comment => {
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
