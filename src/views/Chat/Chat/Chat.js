import { process } from '../Action/Index';
import {
  Avatar,
  Box,
  Text,
  Button,
  Input,
  Flex,
  Center,
  Heading,
} from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
//import './chat.scss'
import { useUser } from '../../../context/UserContext';
import { getAllUsers } from '../../../services/fetch-utils';
import { Link } from 'react-router-dom';

export default function Chat({ username, roomname, socket }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useUser();

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('datadatadata', data);
      let temp = messages;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: data.text,
      });
      setMessages([...temp]);
    });
  }, [socket]);
  useEffect(() => {
    socket.emit('joinRoom', { username: user.github, roomname });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getAllUsers();
      console.log(response);
      setAllUsers(response);
    };

    getUsers();
  }, []);

  const sendData = () => {
    if (text !== '') {
      socket.emit('chat', text);
      setText('');
    }
  };

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  console.log(messages, 'messages');
  console.log('sockettext', socket.text);
  console.log('chat component', username, roomname, socket);
  return (
    <Center>
      <div className="chat">
        <div className="user-name">
          <Heading as="h4" size="md" mb="20px">
            Welcome {username}
            <span> to room: '{roomname}'</span>
          </Heading>
        </div>
        <div className="chat-message">
          {messages.map((message) => {
            if (message.username === username) {
              return (
                <Flex key={message.username}>
                  <Avatar src={user.avatar} />
                  <Box>{message.username}:</Box>
                  <br />
                  <Text pl="15px" font="m" color="blue">
                    {message.text}
                  </Text>
                </Flex>
              );
            } else {
              const postUser = allUsers.find(
                (person) => person.github === message.username
              );
              console.log(postUser);
              return (
                <Flex>
                  <Link to={`/profile/${postUser.github}`}>
                    <Avatar src={postUser.avatar} />
                  </Link>
                  <Box>{message.username}:</Box>
                  <Text pl="15px" font="m" color="red">
                    {message.text}
                  </Text>
                </Flex>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="send">
          <Input
            w="80%"
            placeholder="enter your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                sendData();
              }
            }}
          ></Input>
          <Button onClick={sendData}>Send</Button>
        </div>
      </div>
    </Center>
  );
}
