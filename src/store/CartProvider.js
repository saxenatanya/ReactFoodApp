import { useReducer } from "react";
import CartContext from "./cart-context";

const defalutCartSate = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if (action.type === "ADD") {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);

        }
        const updateTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        return {
            items: updatedItems,
            totalAmount: updateTotalAmount
        }
    }
    if (action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex((item)=> item.id === action.item);
        const existingItem = state.items[existingCartItemIndex];
        const updateTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.item === 1){
                updatedItems= state.items.filter(item => item.id !== action.id )
        }else{
                const updatedItem={...existingItem,amount :existingItem.amount -1};
                updatedItems=[...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items:updatedItems,
            totalAmount:updateTotalAmount
        }
    }

        return defalutCartSate;
};

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defalutCartSate);

    const addItemCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };
    const removeItemCartHandler = (item) => {
        dispatchCartAction({ type: 'REMOVE', item: item });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemCartHandler
    };



    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};

export default CartProvider;
