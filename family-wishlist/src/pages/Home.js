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

        this.isExact = props.match.isExact;
        this.match = props.match;
    }

    state = {
        user: ""
    }
    
    componentDidMount = () => {
        axios.get('http://localhost:5000/users/getUserName/'+ this.match.params.user)
        .then(response => {
            this.setState({
                user: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    render() {
        return (
        <>
        <div className="home-container">
            <section className="nav-section">
                <header className={"nav-header " + (this.isExact && "hide-header")}>Rodzinna lista prezentowa</header>
                <nav className="center-nav">
                    <div className="nav-user"><img className="icon-nav" alt="giftIcon" src={gift} />{this.state.user}</div>
                    <div className="nav-logout" >
                        <NavLink to="/" className="logout-link"><img className="icon-logout" alt="logoutIcon" src={logout} />Wyloguj</NavLink>
                    </div>
                </nav>
            </section>
            <main className="home-main">
                <Switch>
                    <Route path={this.match.path} exact component={UsersList} />
                    <Route path={`${this.match.path}/:userWishlistId`} component={UserWishlist} />
                </Switch>
            </main>
        </div>
        </>

    )
        };
}


export default Home;