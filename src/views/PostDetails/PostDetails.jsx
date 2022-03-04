import {
  Box,
  Button,
  Avatar,
  Input,
  Center,
  ButtonGroup,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import PostHomeBox from '../../components/PostHomeBox/PostHomeBox.jsx';
import {
  aggregateComments,
  createComment,
  deletePost,
  getCommentsByPost,
  getPostById,
} from '../../services/fetch-utils.js';
import { useHistory } from 'react-router-dom';
import PostForm from '../../components/PostForm/PostForm.jsx';
import CodeBox from '../../components/CodeBox/CodeBox';

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const history = useHistory();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getPostAndComments = async () => {
      const returnPost = await getPostById(id);
      setPost(returnPost.body);
      const returnComments = await getCommentsByPost(id);
      setComments(returnComments.body);
      setLoading(false);
    };
    getPostAndComments();
  }, [id]);

  async function commentSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('comment-form');
    const formData = new FormData(form);
    const newComment = formData.get('comment');
    const commentInput = document.getElementById('comment-input');

    if (!user.github) {
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
    setComments(returnComments.body);
    commentInput.value = '';
  }

  const handleReply = (id) => {
    setActiveId(id);
    setShowInput((prev) => !prev);
  };

  const displayInput = (comment) => {
    const replySubmit = async (e) => {
      e.preventDefault();
      if (!user.github) {
        history.push('/login');
      }
      const replyForm = document.getElementById('reply-form');
      const formData = new FormData(replyForm);
      const newReply = formData.get('reply');
      const replyInput = document.getElementById('reply-input');

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

  const handleDelete = async () => {
    const answer = confirm('Are you sure you want to delete this post?');
    if (answer) {
      const response = await deletePost(id);
      history.push('/');
    }
  };
  const handleEdit = async (id) => {
    setShowForm((prev) => !prev);
  };

  return (
    <>
      <PostHomeBox post={post} />
      <Center>
        <ButtonGroup spacing="5">
          {user.github === post.github && (
            <Button onClick={handleDelete}>Delete this Post</Button>
          )}
          {user.github === post.github && (
            <Button onClick={() => handleEdit(id)}>Edit this Post</Button>
          )}
          <Button>Comments {comments.length}</Button>
        </ButtonGroup>
      </Center>
      {showForm && <PostForm setShowForm={setShowForm} />}
      <CodeBox post={post} />
      <form id="comment-form" onSubmit={commentSubmit}>
        <Input
          type="text"
          placeholder="Comments"
          name="comment"
          id="comment-input"
          w="75%"
          required
        ></Input>
        <Button type="submit">Submit</Button>
      </form>
      <br />
      {/* } */}
      {comments
        .sort(function (a, b) {
          return a.created - b.created;
        })
        .map((comment) => {
          return (
            <div key={comment.commentId}>
              <Box key={comment.commentId} maxW="xxl" pl="10px">
                <Box key={comment.commentId} style={{ display: 'flex' }}>
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
                  <div>
                    {activeId === comment.commentId && showInput
                      ? displayInput(comment)
                      : ''}
                  </div>
                </Box>
              </Box>
            </div>
          );
        })}
    </>
  );
}
