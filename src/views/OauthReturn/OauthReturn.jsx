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
      console.log('OAuthreturn', fetchedUser);
      setUser(fetchedUser);
      
      //localStorage.setItem('storageUser', JSON.stringify(fetchedUser));
      //const storedUser = localStorage.getItem('storageUser');
     // const parsedUser = JSON.parse(storedUser);
      //console.log('parseduser', parsedUser);
      
      history.push('/');
    })();
  }, []);

  return <div>User</div>;
}
