import React from "react";
import SidebarChat from "./SidebarChat";


export default function ChatsContainer(props) {
    return  props.chats.map( chat => <SidebarChat 
        data= {chat} 
        key={chat._id} 
        loggedUser = {props.loggedUser} 
        setShowChat = {props.setShowChat} 
        setChatUsername = {props.setChatUsername}
        setChatImg = {props.setChatImg}/> ) 
}