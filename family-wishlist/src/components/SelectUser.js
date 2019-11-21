import React from 'react';
import { NavLink } from 'react-router-dom';

const SelectUser = (props) => {
    return (
        <>
            <select onChange={props.onChange}>
                <option value="Guest">Odwiedź jako gość</option>
                <option value="Zuzia">Zuzia</option>
                <option value="Kasia">Kasia</option>
                <option value="Michał">Michał</option>
            </select>
            <button>
                <NavLink to={{ pathname: `/home/${props.user}` }}>Go to home</NavLink>
            </button>
        </>
    );
}


export default SelectUser;