import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector}  from 'reselect';
import CartItem from '../cart-item/cart-item.component';
import CustomButton from '../custom-button/custom-button.component';
import {selectCartItems} from '../../redux/cart/cart-selectors';
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

const mapsStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default connect(mapsStateToProps)(CartDropdown);