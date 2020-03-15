import React from 'react';
import '../styles/Home.css';
import { NavLink, Switch, Route } from 'react-router-dom';
import UsersList from '../subpages/UsersList';
import UserWishlist from '../subpages/UserWishlist';
import gift from '../assets/icons/gift-red.svg';
import logout from '../assets/icons/logout.svg';
import axios from 'axios';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.match = props.match;
    }

    state = {
        user: ""
    }
    
    componentDidMount = () => {
        if (this.match.params.user !== "Guest") {
        axios.get('/users/getUserName/'+ this.match.params.user)
        .then(response => {
            this.setState({
                user: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        }) 
        } else {
            this.setState({
                user: "Guest"
            });
        }
    }

    render() {
        const isExact = this.props.match.isExact;

        return (
        <>
        <div className="home-container">
            <section className="nav-section">
                <header className={"nav-header " + (isExact && "hide-header")}>Family wishlist</header>
                <nav className="center-nav">
                    <div className="nav-user"><img className="icon-nav" alt="giftIcon" src={gift} />{this.state.user}</div>
                    <div className="nav-logout" >
                        <NavLink to="/" className="logout-link"><img className="icon-logout" alt="logoutIcon" src={logout} />Log out</NavLink>
                    </div>
                </nav>
            </section>
            <main className="home-main">
                <Switch>
                    <Route path={this.match.path} exact component={UsersList} />
                    <Route path={`${this.match.path}/:userWishlistId/:avatarId`} component={UserWishlist} />
                </Switch>
                <footer className="home-footer">Created by Zuzanna Gąsior. Icons made by <a href="https://www.flaticon.com/authors/surang" title="surang">surang</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a></footer>
            </main>
        </div>
        </>

    )
        };
}


export default Home;