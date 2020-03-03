import React from 'react';
import '../styles/AddGiftRow.css';
import acceptIcon from '../assets/icons/accept.svg';
import cancelIcon from '../assets/icons/exit.svg';
import axios from 'axios';

class AddGiftRow extends React.Component {
    constructor(props) {
        super(props);
        this.sessionUser = props.sessionUser;
    }

    state= {
        gift: "",
        giftLink: ""
    }
  
    onValueChange = (e) => {
        const inputId = e.target.id;
        const inputValue = e.target.value;

        this.setState({
            [inputId]: inputValue
        });
    }

    addGift = () => {
        const newGift = {
            gift: this.state.gift,
            giftLink: this.state.giftLink,
            userId: this.sessionUser
        }
        
        axios.post('http://localhost:5000/wishlist/add', newGift)
        .then(() => {
            window.location = window.location.pathname;
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {

        return (
            <>
                <div className="add-gift-row">
                    <div className="gift-order">
                        {this.props.order}
                </div>
                    <div className="addGiftData">
                        <textarea onChange={this.onValueChange} id="gift" placeholder="Dodaj prezent..." ></textarea>
                        <textarea onChange={this.onValueChange} id="giftLink" placeholder="Dodaj link do prezentu (opcjonalnie)..." ></textarea>
                    </div>
                    <div className="add-action-btn-group">
                        <img onClick={this.addGift} className="accept-icon" alt="accept" src={acceptIcon} />
                        <img onClick={this.props.delete} id="addGiftCancel" className="cancel-icon" alt="exit" src={cancelIcon} />
                    </div>
                </div>
                <div className="sub-wishlist-row">
                    <div className="add-action-btn-group-sm">
                        <img className="accept-icon-sm" alt="accept" src={acceptIcon} />
                        <img onClick={this.props.delete} id="addGiftCancel" className="cancel-icon-sm" alt="exit" src={cancelIcon} />
                    </div>
                </div>
            </>
        );
    }
}


export default AddGiftRow;