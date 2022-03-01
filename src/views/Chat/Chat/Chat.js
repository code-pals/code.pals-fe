import { process } from '../Action/Index'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
//import './chat.scss'
import { useUser } from '../../../context/UserContext';


export default function Chat({ username, roomname, socket }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
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
          {username} 
          <img src={user.avatar}/><span style={{ fontSize: '0.7rem'}}>in {roomname}</span>
        </h2>
      </div>
      <div className='chat-message'>
        {messages.map((message) => {
          if (message.username === username) {
            return (
              <div className='message'>
                <p>{message.text}</p>
                <span>{message.username}</span>
              </div>
            );
          } else {
            return (
              <div className='message mess-right'><p>{message.text}</p>
              <span>{message.username}</span>
              
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
