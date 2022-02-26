import { Box, Button, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// import CodeBox from '../../components/CodeBox/CodeBox.jsx';
import {
  createComment,
  getCommentsByPost,
  getPostById,
} from '../../services/fetch-utils.js';

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const singlePost = async () => {
      const returnPost = await getPostById(id);
      console.log('RETURNPOST', returnPost);
      setPost(returnPost.body);
      const returnComments = await getCommentsByPost(id);
      console.log('RETURNCOMMENtS', returnComments);
      setComments(returnComments.body);
      setLoading(false);
    };
    singlePost();
  }, [id]);

  // useEffect(() => {
  //   const commentFunc = async () => {
  //   };
  //   commentFunc();
  // }, [comments]);

  async function commentSubmit(e) {
    e.preventDefault();
    const commentObj = {
      commenter: post.postedBy,
      postId: post.postId,
      comment: newComment,
      parent: null,
      favorited: false,
    };
    const response = await createComment(commentObj);
    const returnComments = await getCommentsByPost(id);
    console.log('RETURNCOMMENtS', returnComments);
    setComments(returnComments.body);
  }
  return (
    <>
      <Box>
        {post.title}
        <br />
        {post.code}
        <br />
        {post.question}
        <br />
        <br />
        <form onSubmit={commentSubmit}>
          <Input
            type="text"
            placeholder="Comments"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></Input>
          <Button type="submit">Button</Button>
        </form>
        <br />
        {comments.map((comment) => {
          return <div key={comment.commentId}>{comment.comment}</div>;
        })}
      </Box>
    </>
  );
}
