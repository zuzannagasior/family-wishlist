import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import WishlistRow from '../components/WishlistRow';
import AddGiftRow from '../components/AddGiftRow';
import binRed from '../assets/icons/bin-red.svg';
import arrow from '../assets/icons/arrow-dark-grey.svg';
import gift from '../assets/icons/gift-light-grey.svg';
import avatarsImg from '../assets/avatarsImg.js';


class UserWishlist extends React.Component {
    constructor(props) {
        super(props);
        this.sessionUser = props.match.params.user;
        this.userWishlistId = props.match.params.userWishlistId;
        this.avatarId = props.match.params.avatarId;

        this.isWishlistMine = (this.sessionUser === this.userWishlistId) ? 1 : 0;
    }

    state = {
        addGiftAvailable: false,
        wishlistData: [],
        user: ""
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/users/getUserName/'+ this.userWishlistId)
        .then(res => {
            document.title = `${res.data} - lista prezentowa - Rodzinna Lista Prezentowa`;

            this.setState({
                user: res.data
            });
        })
        .catch(function(error) {
            console.log(error);
        })

        axios.get('http://localhost:5000/wishlist/all/'+ this.userWishlistId)
        .then(res => {
            this.setState({
                wishlistData: res.data
            })
        
        })
        .catch(function(error) {
            console.log(error);
        }) 
    }

    addGift = () => {
        this.setState({ addGiftAvailable: true });
    }

    deleteAccount = () => {
        axios.delete('http://localhost:5000/users/'+ this.userWishlistId)
        .then(() => {
            window.location = '/';
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    delete = (e) => {
        if (e.target.id === 'addGiftCancel') {
            this.setState({ addGiftAvailable: false });
        }
    }

    render() {

        let wishlist = this.state.wishlistData.map((item, index)=> (
            <WishlistRow key={item._id} order={index + 1} item={item} isWishlistMine={this.isWishlistMine} />
        ));

        const avatarSrc = avatarsImg.find(av => av.avId === this.avatarId).src;

        return (
            <>
                <div className="user-wishlist-cont">
                    <section className="user-nav-section">
                        <img className="user-list-av" alt="avatarIcon" src={avatarSrc} />
                        <div className="header-delete-section-cont">
                            <div className="header-delete-section">
                                <header className="user-header">{this.state.user}</header>
                                {!!this.isWishlistMine && <div onClick={this.deleteAccount} className="delete-account" styles="backgroundColor: red">
                                    <img className="bin-icon" alt="binIcon" src={binRed} /><span className="sm-display-none">Usuń konto</span>
                                </div>}
                            </div>
                            <NavLink to={`/home/${this.sessionUser}`} className="return"><img className="return-arrow" alt="leftArrow" src={arrow} />Powrót</NavLink>
                        </div>
                    </section>
                    <section className="main-wishlist-section">
                        <div className="wishlist-table">
                            <div className="table-headers">
                                <div className="table-header-1">Lista prezentowa</div>
                                {!this.isWishlistMine && <div className="table-header-2">Kto kupuje</div>}
                            </div>
                            {wishlist}
                            {this.state.addGiftAvailable && <AddGiftRow sessionUser={this.sessionUser} delete={this.delete} order={this.state.wishlistData.length + 1} />}
                        </div>
                        {!this.state.addGiftAvailable &&
                            <>
                                {!!this.isWishlistMine && <button onClick={this.addGift} className="add-gift">
                                    dodaj
                                <img className="add-gift-gift" alt="avatarIcon" src={gift} />
                                </button>}
                            </>}
                    </section>
                </div>
            </>
        );
    }
}


export default UserWishlist;

