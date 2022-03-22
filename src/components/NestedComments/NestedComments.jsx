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
    console.log('nestedComments', comments);
    comments.forEach(comment => commentMap[comment.commentId] = comment);
    console.log('commentMap', commentMap);
   
   
    for ( let i =0; i < comments.length; i++){
        if(comments[i].parent !== null){
            const parent = commentMap[comments[i].parent];
   
        
        if(parent.children && !parent.children.includes(comments[i])){
            parent.children.push(comments[i]);
        }
        else if(!parent.children){
            parent.children =[comments[i]];
        }
    }
    }
    console.log('commentsafterforloop', comments)
    
    const nestedComments = comments.filter(comment => {
        return comment.parent === null;
    })

    console.log('nestedCommentsReal', nestedComments);
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

 // const dupComments = comments;
    // dupComments.forEach(comment => {
    //     if(comment.parent !== null) {
    //         const parent = commentMap[comment.parent];
    //         console.log('parentinsideeach', parent);
    //         if (parent.children) {
    //             console.log('commentinsideeach', comment);
    //         parent.children.push(comment);
    //         }
    //         else if (!parent.children){
    //             parent.children = [comment];
    //         }
    //     }
    // });