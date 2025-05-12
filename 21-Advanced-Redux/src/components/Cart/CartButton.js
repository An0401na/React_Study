import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const myCartButtonHandler = (event) => {
    event.preventDefault();
    dispatch(cartActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={myCartButtonHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
