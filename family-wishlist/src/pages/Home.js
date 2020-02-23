import React from 'react';
import '../styles/Home.css';
import { NavLink, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import UsersList from '../subpages/UsersList';
import UserWishlist from '../subpages/UserWishlist';
import gift from '../assets/icons/gift-red.svg';
import logout from '../assets/icons/logout.svg';



const Home = () => {

    const match = useRouteMatch();
    const { isExact } = match;
    console.log('match', match)
    const { user } = useParams();

    return (
        <>
        <div className="home-container">
            <section className="nav-section">
                <header className={"nav-header " + (isExact && "hide-header")}>Rodzinna lista prezentowa</header>
                <nav className="center-nav">
                    <div className="nav-user"><img className="icon-nav" alt="giftIcon" src={gift} />{user}</div>
                    <div className="nav-logout" >
                        <NavLink to="/" className="logout-link"><img className="icon-logout" alt="logoutIcon" src={logout} />Wyloguj</NavLink>
                    </div>
                </nav>
            </section>
            <main className="home-main">
                <Switch>
                    <Route path={match.path} exact component={UsersList} />
                    <Route path={`${match.path}/:userWishlistId:isWishlistMine`} component={UserWishlist} />
                </Switch>
            </main>
        </div>
        </>

    );
}


export default Home;