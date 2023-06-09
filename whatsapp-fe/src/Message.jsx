import React from "react";
import './style/Message.css'

function Message(props) {
    return (
        <p className={ props.sent ? 'chat_message ' : 'chat_receiver'}>
                <span className='chat_name'>{props.author}</span>
                {props.content}
                <span className='chat_timestamp'>{new Date().toUTCString()}</span>
        </p>
    )
}

export default Message