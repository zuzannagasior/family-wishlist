import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import WishlistRow from '../components/WishlistRow';
import AddGiftRow from '../components/AddGiftRow';
import binRed from '../assets/icons/bin-red.svg';
import arrow from '../assets/icons/arrow-dark-grey.svg';
import gift from '../assets/icons/gift-light-grey.svg';
import avatarsImg from '../assets/avatarsImg.js';
import Loading from '../components/Loading';

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
        user: "",
        loading: false
    }

    componentDidMount = () => {

        this.setLoading(true);
        axios.get('/users/getUserName/'+ this.userWishlistId)
        .then(res => {
            document.title = `${res.data} - wishlist - Family wishlist`;

            this.setState({
                user: res.data
            });
        })
        .catch(function(error) {
            console.log(error);
        })

        this.loadWishlist();
    }

    loadWishlist = () => {
        axios.get('/wishlist/all/'+ this.userWishlistId)
        .then(res => {
            this.setState({
                wishlistData: res.data,
                loading: false
            })    
        })
        .catch(function(error) {
            console.log(error);
            this.setLoading(false);
        })
    }

    addGift = () => {
        this.setState({ addGiftAvailable: true });
    }

    deleteAccount = () => {
        this.setLoading(true);
        axios.delete('/users/'+ this.userWishlistId)
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

    setLoading = (param) => {
        this.setState({loading: param});
    }

    render() {

        let wishlist = this.state.wishlistData.map((item, index)=> (
            <WishlistRow key={item._id} order={index + 1} item={item} isWishlistMine={this.isWishlistMine} setLoading={(param) => this.setLoading(param)} loadWishlist={this.loadWishlist}/>
        ));

        const avatarSrc = avatarsImg.find(av => av.avId === this.avatarId).src;
        const loading = this.state.loading;
        const wishlistEmpty = this.state.wishlistData.length === 0;

        return (
            <>
                <div className="user-wishlist-cont">
                    <section className="user-nav-section">
                        <img className="user-list-av" alt="avatarIcon" src={avatarSrc} />
                        <div className="header-delete-section-cont">
                            <div className="header-delete-section">
                                <header className="user-header">{this.state.user}</header>
                                {!!this.isWishlistMine && <div onClick={this.deleteAccount} className="delete-account" styles="backgroundColor: red">
                                    <img className="bin-icon" alt="binIcon" src={binRed} /><span className="sm-display-none">Delete account</span>
                                </div>}
                            </div>
                            <NavLink to={`/home/${this.sessionUser}`} className="return"><img className="return-arrow" alt="leftArrow" src={arrow} />Return</NavLink>
                        </div>
                    </section>
                    {loading ? <Loading /> : 
                    <section className="main-wishlist-section">
                        <div className="wishlist-table">
                            {(wishlistEmpty && !this.state.addGiftAvailable ) ? <div style={{marginLeft: '16px'}}>This wishlist is empty :(</div> :  
                            <div>
                                <div className="table-headers">
                                    <div className="table-header-1">Wishlist</div>
                                    {!this.isWishlistMine && <div className="table-header-2">Who buys</div>}
                                </div>
                                {wishlist}
                            </div>}
                            {this.state.addGiftAvailable && <AddGiftRow sessionUser={this.sessionUser} delete={this.delete} order={this.state.wishlistData.length + 1} setLoading={(param) => this.setLoading(param)} loadWishlist={this.loadWishlist}/>}
                        </div>
                        {!this.state.addGiftAvailable &&
                            <>
                                {!!this.isWishlistMine && <button onClick={this.addGift} className="add-gift">
                                    add
                                <img className="add-gift-gift" alt="avatarIcon" src={gift} />
                                </button>}
                            </>}
                    </section>}
                </div>
            </>
        );
    }
}


export default UserWishlist;

