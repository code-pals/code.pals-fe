import React from 'react';
import Chat from '../Chat/Chat';
import { useParams } from 'react-router-dom';

export default function BoardChat({ socket }) {
  const { username } = useParams();
  const { roomname } = useParams();

  return (
    <>
      <div className="right">
        <Chat username={username} roomname={roomname} socket={socket} />
      </div>
    </>
  );
}
