import React from "react";
import SidebarChat from "./SidebarChat";

export default function ChatsContainer(props) {
    console.log(props.chats);
    return  props.chats.map( chat => <SidebarChat data= {chat} key={chat._id} loggedUser = {props.loggedUser} /> ) 
}