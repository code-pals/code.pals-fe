import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import Homepage from './views/Homepage/Homepage.jsx';
import Login from './views/Login/Login';
import Create from './views/Create/Create.jsx';
//import BoardDetails from './views/BoardDetails/BoardDetails.jsx';
//import PostDetails from './views/PostDetails/PostDetails.jsx';
import Profile from './views/Profile/Profile.jsx';
import Results from './views/Results/Results.jsx';
import DirectMessages from './views/DirectMessages/DirectMessages.jsx';
import AboutUs from './views/AboutUs/AboutUs.jsx';
import Header from './components/Header/Header.jsx';
import OauthReturn from './views/OauthReturn/OauthReturn.jsx';
import { UserProvider } from './context/UserContext.js';
//import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/messages">
            <DirectMessages />
          </Route>
          <Route exact path="/results">
            <Results />
          </Route>
          <Route exact path="/aboutus">
            <AboutUs />
          </Route>
          <Route exact path="/oauthreturn">
            <OauthReturn />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
