import classes from './Checkout.module.css';


const Checkout = (props) => {

const confirmHandler = (event)=>{
event.preventDefault();
}

    return (
        <form>

        <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" />
        </div>
        <div className={classes.control}>
            <label htmlFor="street">Your street</label>
            <input type="text" id="street" />
        </div>
        <div className={classes.control}>
            <label htmlFor="postal">Your post code</label>
            <input type="text" id="postal" />
        </div>
        <div className={classes.control}>
            <label htmlFor="city">Your city</label>
            <input type="text" id="city" />
        </div>
        <div className={classes.action}>
            <button onClick={props.onCancel}>Cancel</button>
<button className={classes.confitm}>confirm</button>
            </div>


        </form>
    )
};

export default Checkout;