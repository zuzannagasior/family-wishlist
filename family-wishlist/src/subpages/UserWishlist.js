import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import WishlistRow from '../components/WishlistRow';
import AddGiftRow from '../components/AddGiftRow';
import avatar from '../assets/avatars/avatarrandom.svg';
import binRed from '../assets/icons/bin-red.svg';
import arrow from '../assets/icons/arrow-dark-grey.svg';
import gift from '../assets/icons/gift-light-grey.svg';

class UserWishlist extends React.Component {
    constructor(props) {
        super(props);
        this.sessionUser = props.match.params.user;
        this.userWishlistId = props.match.params.userWishlistId;

        this.isWishlistMine = (this.sessionUser === this.userWishlistId) ? 1 : 0;
    }

    state = {
        addGiftAvailable: false,
        wishlistData: [],
        user: ""
    }

    componentDidMount = () => {
        axios.get('http://localhost:5000/users/getUserName/'+ this.userWishlistId)
        .then(response => {
            this.setState({
                user: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        })

        if(!!this.isWishlistMine) {
            axios.get('http://localhost:5000/wishlist/mine/'+ this.userWishlistId)
            .then(response => {
                console.log('response', response);
                this.setState({
                    wishlistData: response.data
                })
            })
            .catch(function(error) {
                console.log(error);
            })
        } else {
            axios.get('http://localhost:5000/wishlist/all/'+ this.userWishlistId)
            .then(response => {
                console.log('response', response);

                this.setState({
                    wishlistData: response.data
                })
            })
            .catch(function(error) {
                console.log(error);
            }) 
        }

    }

    addGift = () => {
        console.log('addgift')
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
        console.log('usuniecie konta');
        console.log('e.target.id', e.target.id);

        if(e.target.id === 'addGiftCancel') {
            this.setState({ addGiftAvailable: false });
        } else if(e.target.id === 'deleteAccount') {
            console.log('usuniecie konta');

        }
    }

    render() {

        let wishlist = this.state.wishlistData.map(item => (
            <WishlistRow key={item._id} item={item} isWishlistMine={this.isWishlistMine} />
        ));

        return (
            <>
                <div className="user-wishlist-cont">
                    <section className="user-nav-section">
                        <img className="user-list-av" alt="avatarIcon" src={avatar} />
                        <div className="header-delete-section-cont">
                            <div className="header-delete-section">
                                <header className="user-header">{this.state.user}</header>
                                {!!this.isWishlistMine && <div onClick={this.deleteAccount} className="delete-account" styles="backgroundColor: red">
                                    <img className="bin-icon" alt="binIcon" src={binRed} /><span  className="sm-display-none">Usuń konto</span>
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
                            {this.state.addGiftAvailable && <AddGiftRow delete={this.delete} />}
                        </div>
                        {!this.state.addGiftAvailable &&
                            <>
                                <div className="last-update">Ostania aktualizacja: 11-11-2019</div>
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

