import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import avatar from '../assets/avatars/avatarrandom.svg';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    state = {
        usersData: [],
        usersDataFiltered: []
    }
    
    componentDidMount = () => {
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
        return <NavLink key={user._id} className="user-container" to={`${url}/${user._id}`}>
                    <img className="user-list-av" alt="avatarIcon" src={avatar} />
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