import React from 'react';
import { NavLink } from 'react-router-dom';
import WishlistRow from '../components/WishlistRow';
import avatar from '../assets/avatars/avatarrandom.svg';
import binRed from '../assets/icons/bin-red.svg';
import arrow from '../assets/icons/arrow-dark-grey.svg';
import gift from '../assets/icons/gift-light-grey.svg';

const wishlistData = [
    {
        id: 0,
        order: 1,
        gift: "plakat",
        giftLink: "www.plakat.pl"
    },
    {
        id: 1,
        order: 2,
        gift: "kwiatek",
        giftLink: "www.kwiatek.pl"
    },
    {
        id: 2,
        order: 3,
        gift: "lodówka",
        giftLink: "www.lodówka.pl"
    }
]

class UserWishlist extends React.Component {
    constructor(props) {
        super(props);
        this.isWishlistMine = (props.match.params.user === props.match.params.userWishlistId) ? 1 : 0;
        console.log('this.isWishlistMine', this.isWishlistMine);
        console.log('props', props)
        this.sessionUser = props.match.params.user;
        console.log('this.backUrl', this.backUrl)

    }



    render() {

        let wishlist = wishlistData.map(item => (
            <WishlistRow key={item.id} item={item} />
        ));

        return (
            <>
                <div className="user-wishlist-cont">
                    <section className="user-nav-section">
                        <img className="user-list-av" alt="avatarIcon" src={avatar} />
                        <div className="header-delete-section-cont">
                            <div className="header-delete-section">
                                <header className="user-header">Zuzia</header>
                                <div className="delete-account">
                                    <img className="bin-icon" alt="binIcon" src={binRed} />Usuń konto
                            </div>
                            </div>
                            <NavLink to={`/home/${this.sessionUser}`} className="return"><img className="return-arrow" alt="leftArrow" src={arrow} />Powrót</NavLink>
                        </div>
                    </section>
                    <section className="main-wishlist-section">
                        <div className="wishlist-table">
                            <div className="table-headers">
                                <div className="table-header-1">Lista prezentowa</div>
                                <div className="table-header-2">Kto kupuje</div>
                            </div>
                            {wishlist}
                        </div>
                        <div className="last-update">Ostania aktualizacja: 11-11-2019</div>
                        <button className="add-gift">
                            dodaj
                            <img className="add-gift-gift" alt="avatarIcon" src={gift} />
                        </button>
                    </section>
                </div>
            </>
        );
    }
}


export default UserWishlist;