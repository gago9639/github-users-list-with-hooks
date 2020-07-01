import React, { useState, useEffect } from 'react';
import Button from './Buttons.js';

export default function User(props) {
    const [ isEditorOpen, setIsEditorOpen ] = useState(false);
    const [ login, setLogin ] = useState(props.login);
    const [ nodeId, setNodeId ] = useState(props.nodeId); 

    function handleOnLoginChange(value) {
        setLogin(value);
    }

    function handleOnNodeIdChange(value) {
        setNodeId(value);
    }

    function handleOnCancel() {
        setIsEditorOpen(false);
        setLogin(props.login);
        setNodeId(props.nodeId);
    }
    
    return(
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <a href={props.profileUrl} target="_blank" rel="noopener noreferrer">
                            <img src={props.avatarUrl} className="card-img" alt="user avatar"></img>
                        </a>
                    </div>
                    <div className="col-md-8">
                        <div className="row-75 card-body">
                            {!isEditorOpen
                            ?<InfoDisplay
                                profileUrl = {props.profileUrl}
                                login = {props.login}
                                nodeId = {props.nodeId}
                                />                
                            :<InfoEditor
                                login = {props.login}
                                nodeId = {props.nodeId}
                                onLoginChange = {handleOnLoginChange}
                                onNodeIdChange = {handleOnNodeIdChange}
                            />}                            
                        </div>
                        <div className="row-25 button-bar">          
                            {!isEditorOpen
                            ?<>
                                <Button
                                    action = "SEE_MORE"
                                    onClick = {props.onSeeMore}
                                />
                                <Button 
                                    action = "EDIT"
                                    onClick = {() => { setIsEditorOpen(true); }}
                                />
                                <Button
                                    action = "DELETE"
                                    onClick = {props.onDelete}
                                />
                            </>
                            :<>
                                <Button 
                                    action = "CANCEL"
                                    onClick = {() => { handleOnCancel(); }}
                                />
                                <Button 
                                    action = "SAVE"
                                    onClick = {() => {
                                        setIsEditorOpen(false);
                                        props.onSave(login, nodeId)
                                    }}
                                />
                            </>}
                        </div>                        
                    </div>    
                </div>
            </div>
        );    
}

function InfoEditor(props) {
    const[ login, setLogin ] = useState('');
    const[ nodeId, setNodeId ] = useState('');

    useEffect(() => {
        setLogin(props.login);
        setNodeId(props.nodeId);
    }, [])

    function handleLoginChange(event) {
        setLogin(event.target.value);
        props.onLoginChange(event.target.value);
    }

    function handleNodeIdChange(event) {
        setNodeId(event.target.value);
        props.onNodeIdChange(event.target.value);
    }

    return(
        <div className='user-info-display'>
            <a href={props.profileUrl} target="_blank" rel="noopener noreferrer">
                <h5 className="card-title">Login:<span> </span>
                    <input type="text" onChange={handleLoginChange} value={login}></input>
                </h5>                    
            </a>   
            <span className="text-muted">Node Id:<span> </span>
                <input type="text" onChange={handleNodeIdChange} value={nodeId}></input>
            </span>
        </div>
    );
}

function InfoDisplay(props) {
    return(
        <div className='user-info-display'>
            <a className="text-body" href={props.profileUrl} target="_blank" rel="noopener noreferrer">
                <h5 className="card-title">Login: {props.login}</h5>
            </a>   
            <span className="text-muted">Node Id: {props.nodeId}</span>
        </div>
    );
}