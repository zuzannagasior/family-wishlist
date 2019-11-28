import React from 'react';
import { NavLink } from 'react-router-dom';

import avatar from '../assets/avatars/avatarrandom.svg';


const usersData = [
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "75346"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "2532"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "2314"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "24452"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "45614"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "5354"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "erfrf3"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "fvgev3"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "f34f3"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "4rt3f"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "dfwe"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "74fdv"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "g5563"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "74563"
    },
    {
        name: "Zuzia",
        avatarId: "0",
        userId: "94563"
    }
]

const UsersList = (props) => {
    const url = props.match.url;

    let users = usersData.map(user => (
        <NavLink key={user.userId} className="user-container" to={`${url}/${user.userId}`}>
            <img className="user-list-av" alt="avatarIcon" src={avatar} />
            <span className="av-title">{user.name}</span>
        </NavLink>
    ))

    console.log('users', users)
    return (
        <>
            <header className="user-list-header">Rodzinna lista prezentowa</header>
            <section className="user-list">
                <input type="text" name="searchUser" value={props.newUser} onChange={props.onChange} className="custom-search-input" placeholder="wyszukaj..." />
                <div className="users-container">
                    {users}
                </div>
            </section>
        </>
    );
}


export default UsersList;