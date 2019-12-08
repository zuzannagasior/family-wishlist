import React from 'react';
import '../styles/AddGiftRow.css';
import acceptIcon from '../assets/icons/accept.svg';
import cancelIcon from '../assets/icons/exit.svg';

class AddGiftRow extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    return = () => {

    }

    render() {

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
                        <img onClick={this.props.delete} id="addGiftCancel" className="cancel-icon" alt="exit" src={cancelIcon} />
                    </div>
                </div>
                <div className="sub-wishlist-row">
                    <div className="action-btn-group-sm">
                        <img className="accept-icon-sm" alt="accept" src={acceptIcon} />
                        <img onClick={this.props.delete} id="addGiftCancel" className="cancel-icon-sm" alt="exit" src={cancelIcon} />
                    </div>
                </div>
            </>
        );
    }
}


export default AddGiftRow;