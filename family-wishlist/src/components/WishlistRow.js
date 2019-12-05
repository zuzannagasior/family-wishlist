import React from 'react';
import '../styles/WishlistRow.css';
import acceptIcon from '../assets/icons/accept.svg';
import editPen from '../assets/icons/pen-grey.svg';
import binGrey from '../assets/icons/bin-grey.svg';

class WishlistRow extends React.Component {


    state = {
        editGiftAvailable: false,
        whoBuysEditAvailable: false
    }

    edit = () => {
        if (!this.props.isWishlistMine) {
            this.setState({ whoBuysEditAvailable: true });
        } else {
            this.setState({ editGiftAvailable: true });
        }
    }

    delete = () => {
        if (!this.props.isWishlistMine) {
            this.setState({ whoBuysEditAvailable: false });
        } else {
            this.setState({ editGiftAvailable: false });
        }
    }



    render() {

        const { item } = this.props;
        const showDeleteBin = ((!this.props.isWishlistMine && !!this.state.whoBuysEditAvailable) || !!this.props.isWishlistMine);
        const editMode = (!!this.state.whoBuysEditAvailable || !!this.state.editGiftAvailable);

        return (
            <>
                <div className={"wishlist-row " + ((item.order % 2 === 0) ? "row-2 " : "row-1 ") + (this.state.editGiftAvailable && "edit-borders")}>
                    <div className="gift-order">
                        {item.order}
                    </div>
                    <div className="giftData">
                        {this.state.editGiftAvailable ?
                            <>
                                <input value={item.gift} />
                                <input value={item.giftUrl} />
                            </> :
                            <>
                                <div className="gift-data-row">{item.gift}</div>
                                <div className="gift-data-row"><a href={`http://${item.giftUrl}/`}>{item.giftUrl}</a></div>
                            </>}
                    </div>
                    <div className="who-buys">
                        {this.state.whoBuysEditAvailable ? <input placeholder="Podaj Imię..." /> : `Mikołaj`}
                    </div>
                    <div className="action-btn-group">
                        {editMode ?
                            <img className="accept-icon" alt="accept" src={acceptIcon} /> :
                            <img onClick={this.edit} className={"edit-pen " + (!showDeleteBin && "margin-lr-12")} alt="edit" src={editPen} />}
                        {showDeleteBin &&
                            <img onClick={this.delete} className="wishlist-bin" alt="delete" src={binGrey} />
                        }
                    </div>
                </div>
            </>
        );
    }
}


export default WishlistRow;