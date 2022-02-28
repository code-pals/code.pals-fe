import {
  BrowserRouter as Router,
  // NavLink,
  Route,
  Switch,
} from 'react-router-dom';
import Homepage from './views/Homepage/Homepage.jsx';
import Login from './views/Login/Login';
import Create from './views/Create/Create.jsx';
import BoardDetails from './views/BoardDetails/BoardDetails.jsx';
import PostDetails from './views/PostDetails/PostDetails.jsx';
import Profile from './views/Profile/Profile.jsx';
//import Results from './views/Results/Results.jsx';
import DirectMessages from './views/DirectMessages/DirectMessages.jsx';
import AboutUs from './views/AboutUs/AboutUs.jsx';
import Header from './components/Header/Header.jsx';
import OauthReturn from './views/OauthReturn/OauthReturn.jsx';
import { UserProvider } from './context/UserContext.js';
import CreateProfile from './views/Profile/CreateProfile.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <UserProvider>
            <Header />
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
              <PrivateRoute exact path="/create">
                <Create />
              </PrivateRoute>
              <PrivateRoute exact path="/messages">
                <DirectMessages />
              </PrivateRoute>
              <Route exact path="/results">
                <SearchBar />
              </Route>
              <Route exact path="/aboutus">
                <AboutUs />
              </Route>
              <Route exact path="/oauthreturn">
                <OauthReturn />
              </Route>
              <Route exact path="/createprofile">
                <CreateProfile />
              </Route>
              <Route exact path="/postdetails/:id">
                <PostDetails />
              </Route>
              <Route exact path="/boarddetails/:id">
                <BoardDetails />
              </Route>
            </Switch>
          </UserProvider>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
