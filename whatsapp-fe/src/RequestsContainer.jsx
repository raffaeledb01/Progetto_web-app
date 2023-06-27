import React from "react";
import Request from "./Request";


export default function RequestsContainer(props) {
    return  props.requests.map( request => <Request 
        username = {request.username} 
        key={request._id} 
        loggedUser = {props.loggedUser}
        acceptRequest = {props.acceptRequest}
        declineRequest = {props.declineRequest} /> ) 
}