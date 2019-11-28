import React from 'react';
import { NavLink } from 'react-router-dom';
import user from '../assets/icons/user-grey.svg';
import add from '../assets/icons/add.svg';

// eslint-disable-next-line 
import av0 from '../assets/avatars/avatarrandom.svg';
// eslint-disable-next-line 
import av1 from '../assets/avatars/avatarrandom.svg';
// eslint-disable-next-line 
import av2 from '../assets/avatars/avatarrandom.svg';
// eslint-disable-next-line 
import av3 from '../assets/avatars/avatarrandom.svg';
// eslint-disable-next-line 
import av4 from '../assets/avatars/avatarrandom.svg';
// eslint-disable-next-line 
import av5 from '../assets/avatars/avatarrandom.svg';


const avatarsData = [
    {avId: '0'},
    {avId: '1'},
    {avId: '2'},
    {avId: '3'},
    {avId: '4'},
    {avId: '5'}
]
const AddFamilyMember = (props) => {

    let avatars = avatarsData.map(av => (
        <img key={av.avId} className="add-user-av"  src={`av${av.avId}`} alt="avatarIcon" />
    ))

    console.log(avatars)

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
                    <span>Dodaj nowego członka rodziny:</span>
                    <input type="text" name="inputUsername" value={props.newUser} onChange={props.onChange} className="custom-log-input" placeholder="Podaj Imię..." />
                    <div className="choose-avatar-cont">
                        <span className="title-choose-av">Wybierz avatar</span>
                        <div>{avatars}</div>
                    </div>
                    <div className="add-btn-group">
                        <button className="save-avatar-btn">Zapisz</button><NavLink to="/" onClick={props.onClick} className="add-cancel">Anuluj</NavLink>
                    </div>
                </div>
            }
        </>
    );
};


export default AddFamilyMember;