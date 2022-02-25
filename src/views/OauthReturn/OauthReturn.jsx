import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { fetchUser } from '../../services/users.js';

//Once Oauth completes the user will be redirected to this page:
export default function OauthReturn() {
  let history = useHistory();
  const { setUser } = useUser();
  useEffect(() => {
    (async () => {
      const user = await fetchUser();
      console.log(user);
      setUser(user);
      history.push('/');
    })();
  }, []);

  return <div>User</div>;
}
