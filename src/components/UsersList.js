import React from 'react';
import User from './User.js'

function UsersList(props) {
    return (
        <div className="User-list app-body bg-light">
            {props.users.map((user) => 
                <User 
                    key = {user.id} 
                    avatarUrl = {user.avatar_url}
                    profileUrl = {user.html_url}
                    login = {user.login}
                    nodeId = {user.node_id}
                    onSeeMore = {() => {
                        props.onSeeMore(props.users.find((_user) => _user.id === user.id).login);
                    }}
                    onSave = {(login, nodeId) => {
                        props.onSave(login, nodeId, user.id);
                    }}
                    onDelete = {() => {
                        props.onDelete(user.id);
                    }}
                />)}
        </div>        
    );
}

export default UsersList