import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

export default function Home({ socket }) {
  const [username, setUsername] = useState('');
  const [roomname, setRoomname] = useState('');

  const sendData = () => {
    if (username !== '' && roomname !== '') {
      socket.emit('joinRoom', { username, roomname });
    } else {
      alert('username and roomname are must!!');
      window.location.reload();
    }
  };

  return (
    <>
      <h1>Welcome to the chat.</h1>
      <input
        placeholder="Input Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Input Room"
        value={roomname}
        onChange={(e) => setRoomname(e.target.value)}
      />

      <Link to={`/chat/${roomname}/${username}`}>
        <button onClick={sendData}>Join.</button>
      </Link>
    </>
  );
}
