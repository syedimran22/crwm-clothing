import React from 'react';
import {connect} from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems}) => {
    return(
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.map(cartItem =>(
                        <CartItem key={cartItem.id} item={cartItem} />
                    ))
                }
            </div>
        <CustomButton>Go to Checkout</CustomButton>
        </div>
    );
}

const mapsStateToProps = ({cart:{cartItems}}) => ({
    cartItems
});

export default connect(mapsStateToProps)(CartDropdown);