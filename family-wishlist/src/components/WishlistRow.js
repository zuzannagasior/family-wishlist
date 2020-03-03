import React from 'react';
import '../styles/WishlistRow.css';
import acceptIcon from '../assets/icons/accept.svg';
import cancelIcon from '../assets/icons/exit.svg';
import editPen from '../assets/icons/pen-grey.svg';
import binGrey from '../assets/icons/bin-grey.svg';
import more from '../assets/icons/more.svg';
import axios from 'axios';

class WishlistRow extends React.Component {
    state = {
        editGiftAvailable: false,
        whoBuysEditAvailable: false,
        showMore: false,
        gift: this.props.item.gift,
        giftLink: this.props.item.giftLink,
        whoBuysName: this.props.item.whoBuysName
    }

    startEdit = () => {
        if (!this.props.isWishlistMine) {
            this.setState({ whoBuysEditAvailable: true });
        } else {
            this.setState({ editGiftAvailable: true });
        }
    }

    onValueChange = (e) => {
        let inputId = e.target.id;
        if(inputId.includes('whoBuysName')){
            inputId = 'whoBuysName';
        }
        const inputValue = e.target.value;
    
        this.setState({
            [inputId]: inputValue
        });
    }

    editSave = () => {
        const giftId = this.props.item._id;

        if (!this.props.isWishlistMine) {
            const newWhoBuysName = {
                giftId: giftId,
                whoBuysName: this.state.whoBuysName
            }
    
            axios.post('http://localhost:5000/wishlist/who-buys', newWhoBuysName)
            .then(() => {
                window.location = window.location.pathname;
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            const updatedGift = {
                gift: this.state.gift,
                giftLink: this.state.giftLink
            }
    
            axios.post('http://localhost:5000/wishlist/update/' + giftId, updatedGift)
            .then(() => {
                window.location = window.location.pathname;
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    cancel = () => {
        if (!this.props.isWishlistMine) {
            this.setState({ 
                whoBuysEditAvailable: false,
                whoBuysName: this.props.item.whoBuysName
             });
        } else {
            this.setState({ 
                editGiftAvailable: false,
                gift: this.props.item.gift,
                giftLink: this.props.item.giftLink
            });
        }
    }

    delete = () => {
        const giftId = this.props.item._id;

        if (!this.props.isWishlistMine) {

            axios.delete('http://localhost:5000/wishlist/who-buys/' + giftId)
            .then(() => {
                window.location = window.location.pathname;
            })
            .catch(error => {
                console.log(error);
            });

        } else {
            axios.delete('http://localhost:5000/wishlist/'+ giftId)
            .then(() => {
                window.location = window.location.pathname;
            })
            .catch(function(error) {
                console.log(error);
            })
        }
    }

    showMore = () => {
        this.setState(prevState => ({ showMore: !prevState.showMore }));
    }

    componentDidMount() {
        window.addEventListener("resize", this.onResize);
    }

    onResize = () => {
        if (window.innerWidth > 540) {
            this.setState({
                showMore: false
            });
        }
    }



    render() {

        const { item } = this.props;
        const order = this.props.order;
        let whoBuysUser = this.state.whoBuysName;
        const editMode = (!!this.state.whoBuysEditAvailable || !!this.state.editGiftAvailable);
        const showDeleteBin = ((!this.props.isWishlistMine && !editMode && !!whoBuysUser) || (!!this.props.isWishlistMine && !editMode));

        return (
            <>
                <div className={"wishlist-row " + ((item.order % 2 === 0) ? "row-2 " : "row-1 ") + (this.state.editGiftAvailable && "edit-borders")}>
                    <div className="gift-order">
                        {order}
                    </div>
                    <div className="giftData">
                        {this.state.editGiftAvailable ?
                            <>
                                <input onChange={this.onValueChange} id="gift" value={this.state.gift} />
                                <input onChange={this.onValueChange} id="giftLink" value={this.state.giftLink} />
                            </> :
                            <>
                                <div className="gift-data-row">{item.gift}</div>
                                <div className="gift-data-row"><a href={`http://${item.giftLink}/`}>{item.giftLink}</a></div>
                            </>}
                    </div>
                    {!this.props.isWishlistMine && <div className="who-buys">
                        {this.state.whoBuysEditAvailable ? <input onChange={this.onValueChange} id="whoBuysName1" value={this.state.whoBuysName} placeholder="Podaj Imię..." /> : whoBuysUser}
                    </div>}
                    <div className="action-btn-group">
                        {editMode ?
                            <>
                                <img onClick={this.editSave} className="accept-icon" alt="accept" src={acceptIcon} />
                                <img onClick={this.cancel} className="cancel-icon" alt="exit" src={cancelIcon} />
                            </>
                            :
                            <img onClick={this.startEdit} className={"edit-pen " + (!showDeleteBin && "margin-lr-12")} alt="edit" src={editPen} />}
                        {showDeleteBin &&
                            <img onClick={this.delete} className="wishlist-bin" alt="delete" src={binGrey} />
                        }
                        <img onClick={this.showMore} className={"more " + (this.state.showMore && "rotate-180")} alt="more" src={more} />
                    </div>
                    {/* <img onClick={this.showMore} className={"more " + (this.state.showMore && "rotate-180")} alt="more" src={more} /> */}

                </div>
                {this.state.showMore && <div className="sub-wishlist-row">
                    {!this.props.isWishlistMine && <div className="who-buys-sm">
                        Kto kupuje: {this.state.whoBuysEditAvailable ? <input onChange={this.onValueChange} id="whoBuysName2" value={this.state.whoBuysName} placeholder="Podaj Imię..." /> : whoBuysUser}
                    </div>}
                    <div className="action-btn-group">
                        {editMode ?
                            <>
                                <img onClick={this.editSave} className="accept-icon-sm" alt="accept" src={acceptIcon} />
                                <img onClick={this.cancel} className="cancel-icon-sm" alt="exit" src={cancelIcon} />
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