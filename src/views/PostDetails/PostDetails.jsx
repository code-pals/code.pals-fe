import {
  Box,
  Button,
  Avatar,
  Input,
  Center,
  ButtonGroup,
  Flex,
  useForceUpdate,
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
import PostCommentBox from '../../components/CommentBox/PostCommentBox.jsx';
import NestedComments from '../../components/NestedComments/NestedComments.jsx';

export default function PostDetails() {
  const { id } = useParams();
  const { user } = useUser();
  const history = useHistory();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [favComment, setFavComment] = useState('');

  useEffect(() => {
    const getPostAndComments = async () => {
      const returnPost = await getPostById(id);
      setPost(returnPost.body);
      const returnComments = await getCommentsByPost(id);
      setComments(returnComments.body);
      const comms = returnComments.body;
      const fav = comms.find((comment) => comment.commentId === returnPost.body.favorite);
      setFavComment(fav);
      setLoading(false);
    }
    getPostAndComments()}, []);  

  useEffect(() => {
    const edited = async() => {
      const returnPost = await getPostById(id);
      setPost(returnPost.body);}
    edited()}, [showForm])

  async function commentSubmit(e) {
    e.preventDefault();
    if (!user.github) {
      history.push('/login');
    }
    else {
    const form = document.getElementById('comment-form');
    const formData = new FormData(form);
    const newComment = formData.get('comment');
    const commentInput = document.getElementById('comment-input');

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
    commentInput.value = '';}
  }

  const handleDelete = async () => {
    const answer = confirm('Are you sure you want to delete this post?');
    if (answer) {
      const response = await deletePost(id);
      history.push('/');}
  };

  const handleEdit = async (id) => {
    setShowForm((prev) => !prev);
  };
  
  
  const commentMap = {};
  comments.forEach(comment => commentMap[comment.commentId] = comment);
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
  const nestedComments = comments.filter(comment => {
      return comment.parent === null;
  })

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

      {showForm && <PostForm setShowForm={setShowForm} key={showForm}/>}

      <CodeBox post={post} />

      {favComment && <Box border='1px'>Favorite Comment<Box style={{ display: 'flex' }}> <Avatar pr="0px" src={favComment.avatar} alt={'Author'} /><Box>{favComment.comment}</Box>
      </Box></Box>}
      
      <br/><br/>
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
      {nestedComments.sort((a,b)=> a-b).map((comment) => {
          return (
            <Box key={comment.commentId}>
              <PostCommentBox comment = {comment} post = {post} comments={comments} setComments = {setComments} favComment={favComment} setFavComment={setFavComment} />
            </Box>
          );
        })}
        <br/>
        <br/>
        <br/>
        <br/>
        <div>NESTED COMMENTS PRACTICE
    <NestedComments id={id} />
  </div>
    </>
  );
}
