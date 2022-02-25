import BoardForm from '../../components/BoardForm/BoardForm.jsx';
import PostForm from '../../components/PostForm/PostForm.jsx';
import { useUser } from '../../context/UserContext.js';

export default function Post() {
  const { user } = useUser();

  return (
    <>
    
      <PostForm />
      <BoardForm />
    </>
  );
}
