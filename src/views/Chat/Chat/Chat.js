import { process } from '../Action/Index'
import { Avatar } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
//import './chat.scss'
import { useUser } from '../../../context/UserContext';
import { getAllUsers } from '../../../services/fetch-utils';


export default function Chat({ username, roomname, socket }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useUser();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('message', (data) =>{
    console.log('datadatadata', data);
    let temp = messages;
    temp.push({
      userId: data.userId,
      username: data.username,
      text: data.text,
    });
    setMessages([...temp]);

  });
  }, [socket])
  useEffect(() => {
    socket.emit('joinRoom', { username: user.github, roomname });
   
  }, [])
  useEffect(() => {
  const getUsers = async() => {
    const response = await getAllUsers();
    console.log(response);
    setAllUsers(response);
    }
   
  getUsers()}, [])
  
  const sendData = () => {
    if (text !== '') {
      socket.emit('chat', text);
      setText('');
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
  };

  useEffect(scrollToBottom, [messages]);

  console.log(messages, 'messages');
  console.log('sockettext', socket.text)
  console.log('chat component', username, roomname, socket);
  return (
    <div className='chat'>
      <div className='user-name'>
        <h2>
          Welcome {username} 
          <span style={{ fontSize: '0.7rem'}}>  to room {roomname}</span>
        </h2>
      </div>
      <div className='chat-message'>
        {messages.map((message) => {
          if (message.username === username) {
            return (
              <div className='message'>
                <p>{message.text}</p>
               <Avatar src={user.avatar}/> <span>{message.username}</span>
              </div>
            );
          } else {
            const postUser = allUsers.find((person) => person.github === message.username);
            console.log(postUser);
            return (
              <div className='message mess-right'><p>{message.text}</p>
              <Avatar src={postUser.avatar}/><span>{message.username}</span>

              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
          </div>
      <div className='send'>
        <input 
          placeholder='enter your message'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendData();
            }
          }}
           ></input>
           <button onClick={sendData}>Send</button>
      </div>
      </div>
  )
}
