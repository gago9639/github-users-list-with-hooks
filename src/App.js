import React, { useState, useEffect } from 'react';
import UsersList from './components/UsersList.js';
import SearchBar from './components/SearchBar.js';
import AboutUser from './components/AboutUser/AboutUser.js';
import Loading from './components/Loading/Loading.js';

function App() {
    const [aboutUserPage, setAboutUserPage] = useState({isOpen: false, login: null})
    const [data, setData] = useState({isLoading: true, users: []});
    const [filteredData, setFilteredData] = useState({users: []});

     useEffect(() => {
        window.client.getUsers((res) => {
            setData({isLoading: false, users: []});
            setFilteredData({users: res});
        });
    }, []);

    function handleSearch(text) {
        setFilteredData({users: data.users.filter((user) => ('' === text) ?  true : user.login.includes(text))});
    }

    function handleSeeMore(login) {
        setAboutUserPage({isOpen: true, login})
    }
    function handleSave(login, NodeId, index) {
        setData({isLoading: false, users: data.users.map(setUser)});
        setFilteredData({users: filteredData.users.map(setUser)});

        function setUser(user) {
            if(user.id === index) {
                user.login = login;
                user.node_id = NodeId;

                return user;
            }

            return user;
        }
    }

    function handleDelete(index) {
        const newData = {users: filteredData.users.filter((user) => user.id !== index)};

        setData({isLoading: false, users: newData.users});
        setFilteredData(newData);
    }

    return (<>
        {data.isLoading
        ?<Loading/>
        :<AppContent
            onSearch = {handleSearch}
            users = {filteredData.users}
            onSeeMore = {handleSeeMore}
            onSave = {handleSave}
            onDelete = {handleDelete}
            aboutUserPage = {aboutUserPage}
            onCloseAboutUserPage = {() => {setAboutUserPage({isOpen: false, login: null})}}
        />}
    </>);
}

function AppContent(props) {
    return (
        <div className="App">
            {!props.aboutUserPage.isOpen
            ? <>
                <SearchBar
                    onSearch = {props.onSearch}
                />
                <UsersList
                    users = {props.users}
                    onSeeMore = {props.onSeeMore}
                    onSave = {props.onSave}
                    onDelete = {props.onDelete}
                />
            </>
            : <>
                <AboutUser
                    login = {props.aboutUserPage.login}
                    onBack = {props.onCloseAboutUserPage}
                />
            </>}
        </div>
    );
}

export default App;
