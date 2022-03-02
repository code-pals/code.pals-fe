import { Box, Button, Avatar, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NestedComments from '../../components/NestedComments/NestedComments.jsx';
import { useUser } from '../../context/UserContext.js';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';
import {
  createComment,
  deletePost,
  getCommentsByPost,
  getPostById,
} from '../../services/fetch-utils.js';
import { useHistory } from 'react-router-dom';
import PostForm from '../../components/PostForm/PostForm.jsx';

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const storedUser = JSON.parse(localStorage.getItem('storageUser'));
  const history = useHistory();

  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [forceRender, setForceRender] = useState(1);

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

  useEffect(() => {
    setForceRender(prev => prev + 1);
  }, [showForm])

  async function commentSubmit(e) {
    e.preventDefault();
    if(!user.github) {
      history.push('/login');
    }
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
      if(!user.github) {
        history.push('/login');
      }
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
        <Button type="submit">Submit</Button>
      </form>
    );
  };

  const handleDelete = async () => {
    const answer = confirm('Are you sure you want to delete this post?')
    if(answer) {
    const response = await deletePost(id);
    console.log(response);
    history.push('/');
    }

  }
  const handleEdit = async (id) => {
    setShowForm(prev => !prev);
    
  }

  console.log('replycomment', replyComment);
  console.log(post, 'POSTPOST');
  return (
    <>
      <PostHomeBox post={post} />
      <Button onClick={handleDelete}>Delete this Post</Button>
      <Button onClick={() => handleEdit(id)}>Edit this Post</Button>
      <Button>Comments {comments.length}</Button>
      {showForm && <PostForm setShowForm={setShowForm} setForceRender={setForceRender}/>}
      <form onSubmit={commentSubmit}>
        <Input
          type="text"
          placeholder="Comments"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></Input>
        <Button type="submit">Submit</Button>
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
            <Button onClick={() => handleReply(comment.commentId)}>
              Reply
            </Button>
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
