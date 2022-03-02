import { Box, Button, Avatar, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NestedComments from '../../components/NestedComments/NestedComments.jsx';
import { useUser } from '../../context/UserContext.js';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';
import {
  createComment,
  getCommentsByPost,
  getPostById,
} from '../../services/fetch-utils.js';
import CodeBox from '../../components/CodeBox/CodeBox';

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const storedUser = JSON.parse(localStorage.getItem('storageUser'));

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const singlePost = async () => {
      const returnPost = await getPostById(id);
      console.log('RETURNPOST', returnPost);
      console.log(returnPost.body);
      setPost(returnPost.body);
      const returnComments = await getCommentsByPost(id);
      console.log('RETURNCOMMENtS', returnComments.body);
      console.log(post);
      setComments(returnComments.body);
      setLoading(false);
    };
    singlePost();
  }, [id]);

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

  const handleReply = (id) => {
    setActiveId(id);
    setShowInput((prev) => !prev);
  };

  const [replyComment, setReplyComment] = useState('');
  const displayInput = (comment) => {
    const replySubmit = async (e) => {
      e.preventDefault();
      const replyObj = {
        commenter: user.userId,
        postId: post.postId,
        comment: replyComment,
        parent: comment.commentId,
        favorited: false,
      };
      const response = await createComment(replyObj);
      const returnReplyComments = await getCommentsByPost(id);
      console.log('RETURNREPLYCOMMENtS', returnReplyComments);
      setComments(returnReplyComments.body);
      setReplyComment('');
    };
    return (
      <form onSubmit={replySubmit}>
        <input
          style={{ color: 'black' }}
          value={replyComment}
          onChange={(e) => setReplyComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  };

  console.log('replycomment', replyComment);
  console.log(post, 'POSTPOST');
  return (
    <>
      <PostHomeBox post={post} />
      <CodeBox post={post} />
      <form onSubmit={commentSubmit}>
        <Input
          type="text"
          placeholder="Comments"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          w="50%"
        ></Input>
        <Button type="submit">Button</Button>
      </form>
      <br />
      {/* .sort(function(a,b){return a.created - b.created})} */}
      {comments.map((comment) => {
        return (
          <div key={comment.commentId} style={{ display: 'flex' }}>
            <Avatar src={comment.avatar} alt={'Author'} />
            <br />
            <div>{comment.comment}</div>
            <br />
            <div>By: {comment.username}</div>
            <br />
            <div>Created: {comment.created.slice(0, 10)}</div>
            <button onClick={() => handleReply(comment.commentId)}>
              Reply
            </button>
            <div>
              {activeId === comment.commentId && showInput
                ? displayInput(comment)
                : ''}
            </div>
          </div>
        );
      })}
      {/*  <div>
        <NestedComments commentsArr={comments} />
        </div>
        
      */}
    </>
  );
}
