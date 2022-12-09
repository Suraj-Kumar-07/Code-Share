import React from 'react'
import './msg.css'
// import ReactEmoji from 'react-emoji'

function Message({message:{user,text,date},name}) {
  
        let isSentByCurrentUser=false;

        const trimmedName=name.trim().toLowerCase();

        if(user===trimmedName){
            isSentByCurrentUser=true;
        }
        
  return (
    isSentByCurrentUser?<div className='messageContainer justifyEnd'>
        <div className='sentText pr-10'>You</div>
        <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{text}</p>
            <p>{date}</p>
        </div>
    </div>:
    <div className={`messageContainer justifyStart`}>
    <div className="messageBox backgroundLight">
      <p className="messageText colorDark">{text}</p>
      <p style={{color:"black"}}>{date}</p>
    </div>
    <p className='sentText pl-10'>{user}</p>
    </div>
  )
}

export default Message