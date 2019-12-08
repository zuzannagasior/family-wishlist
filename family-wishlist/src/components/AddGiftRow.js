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
                        <img className="accept-icon-add" alt="accept" src={acceptIcon} />
                        <img onClick={this.props.delete} id="addGiftCancel" className="cancel-icon-add" alt="exit" src={cancelIcon} />
                    </div>
                </div>
            </>
        );
    }
}


export default AddGiftRow;