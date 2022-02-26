import React from 'react';

const dummyData = [
  {
    senderId: 'Elijah',
    text: 'Hi',
  },
  {
    senderId: 'James',
    text: 'Hello',
  },
];

export default function GroupChatList() {
  return (
    <div>
      {dummyData.map((message, index) => {
        return <div>{message.text}</div>;
      })}
    </div>
  );
}
