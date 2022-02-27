import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { UserProvider } from './context/UserContext.js';
import { BrowserRouter as Router } from 'react-router-dom';

render(
  <React.StrictMode>
       <UserProvider>
        <ChakraProvider>
    <App />
    </ChakraProvider>
      </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
