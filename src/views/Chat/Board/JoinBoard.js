import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useUser } from '../../../context/UserContext';
// import './home.scss';

export default function JoinBoard({ socket }) {
  const { user } = useUser();
  const [roomname, setRoomname] = useState('');
  const history = useHistory();

  const sendData = () => {
    if (user.userId !== '' && roomname !== '') {
     history.push(`/chat/${roomname}/${user.github}`)
    } else {
      alert('username and roomname are must!!');
      window.location.reload();
    }
  };

  return (
    <>
      <h1>Welcome to the chat, {user.github}</h1>
      <h2></h2>
      <input
        placeholder="Input Room"
        value={roomname}
        onChange={(e) => setRoomname(e.target.value)}
      />

      
        <button onClick={sendData}>Join.</button>
 
    </>
  );
}
