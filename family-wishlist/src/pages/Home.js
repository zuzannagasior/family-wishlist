import React from 'react';
import '../styles/Home.css';
import { NavLink, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import UsersList from '../subpages/UsersList';
import UserWishlist from '../subpages/UserWishlist';


const Home = () => {

    const match = useRouteMatch();
    console.log('match', match)
    const { user } = useParams();

    return (
        <>
            <header>Rodzinna lista prezentowa</header>
            <nav>
                <span>{user}</span>
                <NavLink to="/" >Wyloguj</NavLink>
            </nav>
            <main>
                <Switch>
                    <Route path={match.path} exact component={UsersList} />
                    <Route path={`${match.path}/:userWishlistId`} component={UserWishlist} />
                </Switch>
            </main>
        </>

    );
}


export default Home;