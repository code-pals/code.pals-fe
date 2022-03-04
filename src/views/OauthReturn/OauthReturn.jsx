import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../../context/UserContext.js';
import { fetchUser } from '../../services/users.js';

//Once Oauth completes the user will be redirected to this page:
export default function OauthReturn() {
  let history = useHistory();
  const { user, setUser } = useUser();

  useEffect(() => {
    (async () => {
      const fetchedUser = await fetchUser();
      setUser(fetchedUser);

      history.push('/');
    })();
  }, []);

  return <div>User</div>;
}
