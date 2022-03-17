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
import { createComment, favoriteComment } from '../../services/fetch-utils';
import { getCommentsByPost } from '../../services/fetch-utils';
import { useParams } from 'react-router-dom';

export default function PostCommentBox({ comment, post, setComments }) {
    const [showInput, setShowInput] = useState(false);
    const [activeId, setActiveId] = useState('');
    const [favID, setFavID] = useState('');
    const { user } = useUser();
    const { id } = useParams();
    

    // useEffect(() => {
    //     const getPostAndComments = async () => {
    //       const returnPost = await getPostById(id);
    //       setPost(returnPost.body);
    //       const returnComments = await getCommentsByPost(id);
    //       setComments(returnComments.body);
    //       setLoading(false);
    //     };
    //     getPostAndComments();
    //   }, [id]);

    const handleFavorite = async ( commentId ) => {
        console.log('commentfavorite', commentId)
        const resPost = await favoriteComment(commentId, post);
        setFavID(resPost.post_id);
        window.location.reload();
        console.log(resPost);
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
      const newReply = formData.get('reply');
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
      replyInput.value = '';
    }
    };

    
    return (
      <>
        <Center>
          <form id="reply-form" onSubmit={replySubmit}>
            <Input
              style={{ color: 'black' }}
              name="reply"
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
    <div><Box maxW="xxl" pl="10px">
    <Box style={{ display: 'flex' }}>
      <Avatar pr="10px" src={comment.avatar} alt={'Author'} />
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
      {user.github === post.github &&<Button pr='25px' onClick={() => handleFavorite(comment.commentId)}>Favorite</Button>}
      <div>
        {activeId === comment.commentId && showInput
          ? displayInput(comment)
          : ''}
      </div>
    </Box>
  </Box></div>
  )
}
