import React from 'react';
import '../styles/WishlistRow.css';
import editPen from '../assets/icons/pen-grey.svg';
import binGrey from '../assets/icons/bin-grey.svg';


const WishlistRow = (props) => {

    const { item } = props;
    return (
        <>
            <div className={"wishlist-row " + ((item.order % 2 === 0) ? "row-2" : "row-1")}>
                <div className="gift-order">
                    {item.order}
                </div>
                <div className="giftData">
                    {item.gift}
                    {item.giftUrl}
                </div>
                <div className="who-buys">
                    Mikołaj
                </div>
                <div className="action-btn-group">
                    <img className="edit-pen" alt="edit" src={editPen} />
                    <img className="wishlist-bin" alt="delete" src={binGrey} />
                </div>
            </div>
        </>
    );
}


export default WishlistRow;