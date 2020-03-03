import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import avatarsImg from '../assets/avatarsImg.js';

class UsersList extends React.Component {
    state = {
        usersData: [],
        usersDataFiltered: []
    }
    
    componentDidMount = () => {
        document.title = "Lista użytkowników - Rodzinna Lista Prezentowa";
          
        axios.get('http://localhost:5000/users')
            .then(response => {
                this.setState({
                    usersData: response.data,
                    usersDataFiltered: response.data
                })
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    handleSearch = (e) => {
        const searchValue = e.target.value;
        const usersDataFiltered = this.state.usersData.filter(user => user.username.toUpperCase().includes(searchValue.toUpperCase()))

        this.setState({
            usersDataFiltered: usersDataFiltered
        })
    }

render() {
    const url = this.props.match.url;

    let users = this.state.usersDataFiltered.map(user => {
        const avatarSrc = avatarsImg.find(av => av.avId === user.avatarId.toString()).src;
        return <NavLink key={user._id} className="user-container" to={`${url}/${user._id}/${user.avatarId}`}>
                    <img className="user-list-av" alt="avatarIcon" src={avatarSrc} />
                    <span className="av-title">{user.username}</span>
                </NavLink>
    });

    return (
        <>
            <header className="user-list-header">Rodzinna lista prezentowa</header>
            <section className="user-list">
                <input type="text" name="searchUser" onChange={this.handleSearch} className="custom-search-input" placeholder="wyszukaj..." />
                <div className="users-container">
                    {users}
                </div>
            </section>
        </>
    )
    };
}


export default UsersList;