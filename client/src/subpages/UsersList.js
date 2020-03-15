import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Loading from '../components/Loading';
import avatarsImg from '../assets/avatarsImg.js';

class UsersList extends React.Component {
    state = {
        usersData: [],
        usersDataFiltered: [],
        loading: false
    }

    componentDidMount = () => {
        document.title = "User list - Family wishlist";

        this.setState({ loading: true });
        axios.get('http://localhost:5000/users')
            .then(response => {
                this.setState({
                    usersData: response.data,
                    usersDataFiltered: response.data, 
                    loading: false
                })
            })
            .catch(function(error) {
                console.log(error);
                this.setState({ loading: false });
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
    const loading = this.state.loading;

    let users = this.state.usersDataFiltered.map(user => {
        const avatarSrc = avatarsImg.find(av => av.avId === user.avatarId.toString()).src;
        return <NavLink key={user._id} className="user-container" to={`${url}/${user._id}/${user.avatarId}`}>
                    <img className="user-list-av" alt="avatarIcon" src={avatarSrc} />
                    <span className="av-title">{user.username}</span>
                </NavLink>
    });

    return (
        <>
            <header className="user-list-header">Family wishlist</header>
            {loading ? <Loading /> : 
                <section className="user-list">
                    <input type="text" name="searchUser" onChange={this.handleSearch} className="custom-search-input" placeholder="search..." />
                    <div className="users-container">
                        {users}
                    </div>
                </section>
            }
        </>
    )
    };
}


export default UsersList;