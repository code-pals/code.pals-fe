import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage.jsx';
import Login from './views/Login/Login';
import Create from './views/Create/Create.jsx';
import BoardDetails from './views/BoardDetails/BoardDetails.jsx';
import PostDetails from './views/PostDetails/PostDetails.jsx';
import Profile from './views/Profile/Profile.jsx';
import AboutUs from './views/AboutUs/AboutUs.jsx';
import Header from './components/Header/Header.jsx';
import OauthReturn from './views/OauthReturn/OauthReturn.jsx';
import { UserProvider } from './context/UserContext.js';
import CreateProfile from './views/Profile/CreateProfile.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import Chat from './views/Chat/Chat/Chat.js';
import JoinBoard from './views/Chat/Board/JoinBoard.js';
import { io } from 'socket.io-client';
import BoardChat from './views/Chat/Board/BoardChat.jsx';
import ChatRooms from './views/ChatRooms/ChatRooms.jsx';
//implementing socket.io mocking
const url =
  process.env.NODE_ENV === 'test' ? '' : 'https://codepalz.herokuapp.com';
 //process.env.NODE_ENV === 'test' ? '' : 'http://localhost:7890';
//const socket = io.connect(url);
const socket = io.connect('https://codepalz.herokuapp.com');
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
              <Route exact path="/profile/:username">
                <Profile />
              </Route>
              <PrivateRoute exact path="/create">
                <Create />
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
              <Route exact path="/chat">
                <JoinBoard socket={socket} />
              </Route>
              <Route exact path="/chat/:roomname/:username">
                <BoardChat socket={socket} />
              </Route>
              <Route exact path="/boarddetails/:id">
                <BoardDetails />
              </Route>
              <PrivateRoute exact path="/chatrooms">
                <ChatRooms />
              </PrivateRoute>
            </Switch>
          </UserProvider>
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
