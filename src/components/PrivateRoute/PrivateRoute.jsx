import { Redirect, Route } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

export default function PrivateRoute({ children, ...rest }) {
  const { user } = useUser();
  console.log('PRIVATEROUTEPAGE', user.github);
  const userObj = localStorage.getItem('storageUser');
  console.log(userObj);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userObj ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
