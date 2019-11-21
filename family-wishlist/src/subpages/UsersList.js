import React from 'react';
import { NavLink } from 'react-router-dom';


const UsersList = (props) => {
    const url = props.match.url;

    return (
        <>
           Lista członków rodziny
           <br/>
           <NavLink to={`${url}/Zuzia`}>Zuzia</NavLink>
           <br/>
           <NavLink to={`${url}/Gosia`}>Gosia</NavLink>
           <br/>
           <NavLink to={`${url}/Michal`}>Michał</NavLink>
        </>
    );
}


export default UsersList;