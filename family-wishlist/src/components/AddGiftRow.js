import React from 'react';
import '../styles/AddGiftRow.css';
import acceptIcon from '../assets/icons/accept.svg';
import binGrey from '../assets/icons/bin-grey.svg';


const AddGiftRow = (props) => {

    return (
        <>
            <div className="add-gift-row">
                <div className="gift-order">
                    4
                </div>
                <div className="addGiftData">
                    <textarea placeholder="Dodaj prezent..." ></textarea>
                    <textarea placeholder="Dodaj link do prezentu (opcjonalnie)..." ></textarea>
                </div>
                <div className="action-btn-group">
                    <img className="accept-icon" alt="accept" src={acceptIcon} />
                    <img className="wishlist-bin" alt="delete" src={binGrey} />
                </div>
            </div>
        </>
    );
}


export default AddGiftRow;