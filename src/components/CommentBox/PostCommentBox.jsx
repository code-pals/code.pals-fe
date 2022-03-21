import React from 'react'
import {
    Box,
    Button,
    Avatar,
    Input,
    Center,
    ButtonGroup,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { createComment, favoriteComment, getCommentById } from '../../services/fetch-utils';
import { getCommentsByPost } from '../../services/fetch-utils';
import { useParams } from 'react-router-dom';
import NestedComments from '../NestedComments/NestedComments';

export default function PostCommentBox({ comment, post, comments, setComments, setFavComment }) {
    const [showInput, setShowInput] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [favID, setFavID] = useState(0);
    const { user } = useUser();
    const { id } = useParams();

    const handleFavorite = async ( commentId ) => {
        console.log('commentfavorite', commentId)
        const resPost = await favoriteComment(commentId, post);
        const fav = comments.find((comment) => comment.commentId === resPost.body.favorite);
        let newFav = {...fav};
        setFavComment(newFav);
    }

    const handleReply = (id) => {
        setActiveId(id);
        setShowInput((prev) => !prev);
      };

     //display comment reply form 
    const displayInput = (comment) => {
      const replySubmit = async (e) => {
        e.preventDefault();
        if (!user.github) {
        history.push('/login');
        }
        else {
        const replyForm = document.getElementById('reply-form');
        const formData = new FormData(replyForm);
        const newReply = formData.get('replay');
        console.log('newReply', newReply);
        const replyInput = document.getElementById('reply-input');
        console.log('replyinput', replyInput);

        const replyObj = {
          commenter: user.userId,
          postId: post.postId,
          comment: newReply,
          parent: comment.commentId,
          favorited: false,
        };
        const response = await createComment(replyObj);
        const returnReplyComments = await getCommentsByPost(id);
        setComments(returnReplyComments.body);
        setShowInput((prev) => !prev);
        }
      };
    return (
      <>
        <Center>
          <form id="reply-form" onSubmit={replySubmit}>
            <Input
              style={{ color: 'red' }}
              type="text"
              placeholder="Comments"
              name="replay"
              id="reply-input"
              required
            />
            <Button type="submit">Submit</Button>
          </form>
        </Center>
      </>
    );
  };


  return (
    <div><Box maxW="xxl" pl="10px">{}
    <Box style={{ display: 'flex' }}>
      <Avatar pr="0px" src={comment.avatar} alt={'Author'} />
      <br />
      <Box pl="15px" pr="25px">
        {comment.comment}
      </Box>
      <br />
      <Box pr="25px">By: {comment.github}</Box>
      <br />
      <Box pr="25px">{comment.created.slice(0, 10)}</Box>
      <Button onClick={() => handleReply(comment.commentId)}>
        Reply
      </Button>
      {user.github === post.github && <Button pr='25px' onClick={() => handleFavorite(comment.commentId)}>Favorite</Button>}
      <div>
        {activeId === comment.commentId && showInput
          ? displayInput(comment)
          : ''}
      </div>
    </Box>
  </Box>
  
  
  </div>
  )
}
