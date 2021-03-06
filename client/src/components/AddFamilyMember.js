import React from 'react';
import { NavLink } from 'react-router-dom';
import user from '../assets/icons/user-grey.svg';
import add from '../assets/icons/add.svg';
import error from '../assets/icons/error.svg';

import avatarsImg from '../assets/avatarsImg.js';


const AddFamilyMember = (props) => {

    const { addFamilyMember, newUser, newUserAvId, submitted } = props.state;

    let avatars = avatarsImg.map(av => (
        <img key={av.avId} id={av.avId} onClick={props.chooseAvatar} className={"add-user-av " + ((newUserAvId === av.avId) && "av-active")} src={av.src} alt={av.description} />
    ))

    function showError(val)  {
        if(!val && submitted) {
            return true;
        }
        return false;
    }

    return (
        <>
            {!addFamilyMember &&
                <div className="add-cont-first">
                    <span>Or add a new family member:</span>
                    <button className="add-user-btn" onClick={props.showAddUserSection}>
                        <img className="add-icon" alt="addIcon" src={add} />
                        <img className="user-icon" alt="userIcon" src={user} />
                    </button>
                </div>
            }
            {!!addFamilyMember &&
                <form onSubmit={props.onSubmit} className="add-cont-second">
                    <span>Add new family member:</span>
                    <div>
                        <input type="text" name="inputUsername" value={newUser} onChange={props.onChange} className="custom-log-input" placeholder="Provide name..." />
                        {showError(newUser) && <img className="error-icon" alt="errorIcon" src={error} />}
                    </div>
                    <div className="choose-avatar-cont">
                        <div className="title-choose-av">Please choose an avatar{showError(newUserAvId) && <img className="error-icon" alt="errorIcon" src={error} />}
                        </div>
                        <div className="av-cont">{avatars}</div>
                    </div>
                    <div className="add-btn-group">
                        <input type="submit" className="save-avatar-btn" value="Save" /><NavLink to="/" onClick={props.showAddUserSection} className="add-cancel">Cancel</NavLink>
                    </div>
                </form>}
        </>
    );
};


export default AddFamilyMember;