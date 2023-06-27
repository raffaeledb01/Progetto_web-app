import React from "react";
import Friend from "./Friend";


export default function FriendsContainer(props) {
    return  props.friends.map( friend => <Friend 
        username = {friend.username} 
        key={friend._id} 
        loggedUser = {props.loggedUser}
        removeFriend = {props.removeFriend} 
        addChat = {props.addChat} /> ) 
}