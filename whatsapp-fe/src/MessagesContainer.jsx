import React from "react";
import Message from "./Message";

export default function MessagesContainer(props) {
    if(props.messages.length !== 0){
    return  props.messages.map( message => <Message 
        author= {message.author} 
        content = {message.content}
        timeStamp = {message.timeStamp}
        key={message._id} 
        loggedUser = {props.loggedUser}
         /> )}
}