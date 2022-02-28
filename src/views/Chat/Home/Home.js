import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
// import './home.scss';

export default function Home({ socket }) {
  const { user } = useUser();
  const [roomname, setRoomname] = useState('');

  const sendData = () => {
    if (user.userId !== '' && roomname !== '') {
      console.log(user.userId, roomname);
      socket.emit('joinRoom', { user_id: user.userId, roomname });
    } else {
      alert('username and roomname are must!!');
      window.location.reload();
    }
  };

  return (
    <>
      <h1>Welcome to the chat.</h1>
      <h2>{user.github}</h2>
      <input
        placeholder="Input Room"
        value={roomname}
        onChange={(e) => setRoomname(e.target.value)}
      />

      <Link to={`/chat/${roomname}/${user.github}`}>
        <button onClick={sendData}>Join.</button>
      </Link>
    </>
  );
}
