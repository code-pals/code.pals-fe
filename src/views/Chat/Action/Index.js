import React from 'react';

export const Process = (encrypt, text, cypher) => {
  return {
    type: 'PROCESS',
    payload: {
      encrypt,
      text,
      cypher,
    },
  };
};
