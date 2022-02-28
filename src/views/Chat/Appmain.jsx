import React from 'react'
import Chat from './Chat/Chat'

export default function Appmain(props) {
  return (
      <>
    <div className='right'>
        <Chat
            username={props.match.params.username}
            roomname={props.match.params.roomname}
            socket={socket}
            />
    </div>
    
    </>
  )
}
