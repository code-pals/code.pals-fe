import { render } from '@testing-library/react';
import { UserProvider } from './context/UserContext.js';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Homepage from './views/Homepage/Homepage.jsx';
import Login from './views/Login/Login.jsx';
import Profile from './views/Profile/Profile.jsx';
import Header from './components/Header/Header.jsx';
import Create from './views/Create/Create.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import AboutUs from './views/AboutUs/AboutUs.jsx';
import CreateProfile from './views/Profile/CreateProfile.jsx';
import PostDetails from './views/PostDetails/PostDetails.jsx';
import JoinBoard from './views/Chat/Board/JoinBoard.js';
import BoardChat from './views/Chat/Board/BoardChat.jsx';
import BoardDetails from './views/BoardDetails/BoardDetails.jsx';
import ChatRooms from './views/ChatRooms/ChatRooms.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import OauthReturn from './views/OauthReturn/OauthReturn.jsx';
import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';

jest.mock('socket.io-client');
jest.mock('../src/context/UserContext.js');

describe('it tests the entire app', () => {
  let socket;

  beforeEach(() => {
    socket = new MockedSocket();
    socketIOClient.mockReturnValue(socket);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the homepage', () => {
    const mockUser = {
      user_id: 1,
      github: 'h',
      email: 's@s.com',
      username: 'alchemy',
      pronoun: 'they',
      experience: 'hard',
      tech: 'JS',
      avatar: 'https://placekitten.com/200/300',
      repos: 123,
      bio: 'stuff',
      member_since: '2020',
      created: Date.now(),
    };
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <ChakraProvider>
          <UserProvider mockUser={{ mockUser }}>
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
              <Route exact path="/chatrooms">
                <ChatRooms />
              </Route>
            </Switch>
          </UserProvider>
        </ChakraProvider>
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
