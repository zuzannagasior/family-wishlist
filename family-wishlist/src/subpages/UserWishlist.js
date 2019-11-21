import React from 'react';

class UserWishlist extends React.Component {
    constructor(props) {
        super(props);
        this.isWishlistMine = (props.match.params.user === props.match.params.userWishlistId) ? 1 : 0;
        
    }
    render() {

    return (
        <>
            {this.isWishlistMine  ? 'Lista prezentowa MOJA' : 'Lista prezentowa CZYJAS'}
        </>
    );
}
}


export default UserWishlist;