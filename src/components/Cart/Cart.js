import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';



const Cart = (props) => {
    const [isCheckout,setCheckout] = useState(false);
    const cartCtx = useContext(CartContext);

    const totalAmount =`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length >0;

    const cartItemAddHandler =(item) =>{
        cartCtx.addItem({...item,amount:1});
    };

    const cartItemRemoveHandler =(id)=>{
            cartCtx.removeItem(id);
    };

    const orderHandler =()=>{
setCheckout(true);
    };

    const modalActions =   <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
  {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}  

</div>;

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (<li><CartItem 
            key={item.id}
             name={item.name}
             amount={item.amount}
             price={item.price}
             onRemove={cartItemRemoveHandler.bind(null,item.id)}
             onAdd={cartItemAddHandler.bind(null,item)}
             
             /></li>))}
        </ul>
    );

    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
           {isCheckout &&  <Checkout onClick={props.onClose}/> }
          {!isCheckout && modalActions}
        </Modal>
    );
};

export default Cart;
