import React from 'react';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import user from '../assets/icons/user-green.svg';
import gift from '../assets/icons/gift-red.svg';
import arrow from '../assets/icons/arrow-grey.svg';

const users = [
    { value: 'Gość', label: 'Gość' },
    { value: 'Zuzia', label: 'Zuzia' },
    { value: 'Kasia', label: 'Kasia' },
    { value: 'Michał', label: 'Michał' }
];

const userSelectStyle = {
    container: (provided) => ({
        ...provided,
        width: 200,
        borderRadius: 0
    }),
    control: (provided, state) => ({
        ...provided,
        outline: state.isFocused ? "1px solid #A0A0A0" : "none",
        borderRadius: 0,
        borderColor: state.isFocused ? "#A0A0A0" : "#ccc",
        backgroundColor: "#fafafa",
        boxShadow: "none",
        height: 40,
        '&:hover': {
            borderColor: "#A0A0A0"
          }
    }),
    indicatorsContainer: () => ({
        display: "none"
    }),
    menu:(provided) => ({
        ...provided,
        backgroundColor: "#fafafa",
        marginTop: "5px",
        borderRadius: 0
    }),
    option: (provided, state) => ({
        ...provided,
        color: "#3A3A3A",
        fontWeight: state.isSelected ? 'bold' : "regular",
        backgroundColor: "#fafafa",
        '&:hover': {
            backgroundColor: "#F2F2F2"
          }
    }),
 
}

const SelectUser = (props) => {
    return (
        <>
            <div className={"log-icon-cont "  + (props.addFamilyMember && "display-none")}>
                <img className="icon-login" alt="userIcon" src={user} />
                <img className="icon-login" alt="giftIcon" src={gift} />
            </div>
            <span className={"browse-span "  + (props.addFamilyMember && "display-none")}>Przeglądaj jako:</span>
            <div className={"user-sel-cont "  + (props.addFamilyMember && "display-none")}>
                <Select
                    styles={userSelectStyle}
                    onChange={props.onChange}
                    options={users}
                    defaultValue={users[0]}
                    />
                <NavLink to={{ pathname: `/home/${props.user.value}` }}><button className="go-home-btn"><img className="go-home-arrow" alt="arrowIcon" src={arrow} /></button></NavLink>
            </div>
        </>
    );
}


export default SelectUser;