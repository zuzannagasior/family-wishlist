import React from 'react';
import { NavLink } from 'react-router-dom';


const AddFamilyMember = (props) => {
    return (
        <>
            {!props.addFamilyMember &&
                <div>
                    <span>Lub dodaj nowego członka rodziny</span>
                    <button onClick={props.onClick}>
                        + dodaj
                    </button>
                </div>
            }
            {!!props.addFamilyMember &&
                <div>
                    <span>Dodaj nowego członka rodziny</span>
                    <NavLink to="/" onClick={props.onClick}>Anuluj</NavLink>
                </div>
            }
        </>
    );
};


export default AddFamilyMember;