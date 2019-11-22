import React from 'react';
import { NavLink } from 'react-router-dom';
import user from '../assets/icons/user-grey.svg';
import add from '../assets/icons/add.svg';


const AddFamilyMember = (props) => {
    return (
        <>
            {!props.addFamilyMember &&
                <div className="add-cont-first">
                    <span>Lub dodaj członka rodziny:</span>
                    <button className="add-user-btn" onClick={props.onClick}>
                        <img className="add-icon" alt="addIcon" src={add} />
                        <img className="user-icon" alt="userIcon" src={user} />
                    </button>
                </div>
            }
            {!!props.addFamilyMember &&
                <div className="add-cont-second">
                    <span>Dodaj nowego członka rodziny: </span>
                    <NavLink to="/" onClick={props.onClick}>Anuluj</NavLink>
                </div>
            }
        </>
    );
};


export default AddFamilyMember;