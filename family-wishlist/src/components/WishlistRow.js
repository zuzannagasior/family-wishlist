import React from 'react';
import '../styles/WishlistRow.css';
import acceptIcon from '../assets/icons/accept.svg';
import cancelIcon from '../assets/icons/exit.svg';
import editPen from '../assets/icons/pen-grey.svg';
import binGrey from '../assets/icons/bin-grey.svg';
import more from '../assets/icons/more.svg';
import axios from 'axios';

class WishlistRow extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props, 'this.props');
    }

    state = {
        editGiftAvailable: false,
        whoBuysEditAvailable: false,
        showMore: false,
    }

    startEdit = () => {

        console.log('this.props.isWishlistMine', this.props.isWishlistMine);
        if (!this.props.isWishlistMine) {
            this.setState({ whoBuysEditAvailable: true });
        } else {
            this.setState({ editGiftAvailable: true });
        }
    }

    editSave = () => {

    }

    delete = () => {
        if (!this.props.isWishlistMine) {
            this.setState({ whoBuysEditAvailable: false });
        } else {
            this.setState({ editGiftAvailable: false });
        }
    }

    deleteRow = () => {
        console.log(this.props, 'this.props')
        const giftId = this.props.item._id;

        axios.delete('http://localhost:5000/wishlist/'+ giftId)
        .then(() => {
            window.location = `/home/`;
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    showMore = () => {
        this.setState(prevState => ({ showMore: !prevState.showMore }));
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
    }

    onResize = () => {
        console.log('window.innerWidth', window.innerWidth);
        if (window.innerWidth > 540) {
            this.setState({
                showMore: false
            });
        }
    }



    render() {

        const { item } = this.props;
        // let whoBuysUser = 'Mikołaj';
        let whoBuysUser = '';
        const editMode = (!!this.state.whoBuysEditAvailable || !!this.state.editGiftAvailable);
        const showDeleteBin = ((!this.props.isWishlistMine && !editMode && !!whoBuysUser) || (!!this.props.isWishlistMine && !editMode));

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
                                <input value={item.giftLink} />
                            </> :
                            <>
                                <div className="gift-data-row">{item.gift}</div>
                                <div className="gift-data-row"><a href={`http://${item.giftLink}/`}>{item.giftLink}</a></div>
                            </>}
                    </div>
                    {!this.props.isWishlistMine && <div className="who-buys">
                        {this.state.whoBuysEditAvailable ? <input placeholder="Podaj Imię..." /> : whoBuysUser}
                    </div>}
                    <div className="action-btn-group">
                        {editMode ?
                            <>
                                <img onClick={this.editSave} className="accept-icon" alt="accept" src={acceptIcon} />
                                <img onClick={this.delete} className="cancel-icon" alt="exit" src={cancelIcon} />
                            </>
                            :
                            <img onClick={this.startEdit} className={"edit-pen " + (!showDeleteBin && "margin-lr-12")} alt="edit" src={editPen} />}
                        {showDeleteBin &&
                            <img onClick={this.deleteRow} className="wishlist-bin" alt="delete" src={binGrey} />
                        }
                        <img onClick={this.showMore} className={"more " + (this.state.showMore && "rotate-180")} alt="more" src={more} />
                    </div>
                    {/* <img onClick={this.showMore} className={"more " + (this.state.showMore && "rotate-180")} alt="more" src={more} /> */}

                </div>
                {this.state.showMore && <div className="sub-wishlist-row">
                    {!this.props.isWishlistMine && <div className="who-buys-sm">
                        Kto kupuje: {this.state.whoBuysEditAvailable ? <input placeholder="Podaj Imię..." /> : whoBuysUser}
                    </div>}
                    <div className="action-btn-group">
                        {editMode ?
                            <>
                                <img className="accept-icon-sm" alt="accept" src={acceptIcon} />
                                <img onClick={this.delete} className="cancel-icon-sm" alt="exit" src={cancelIcon} />
                            </>
                            :
                            <img onClick={this.startEdit} className={"edit-pen-sm " + (!showDeleteBin && "margin-lr-12")} alt="edit" src={editPen} />}
                        {showDeleteBin &&
                            <img onClick={this.delete} className="wishlist-bin-sm" alt="delete" src={binGrey} />
                        }
                    </div>
                </div>}
            </>
        );
    }
}


export default WishlistRow;