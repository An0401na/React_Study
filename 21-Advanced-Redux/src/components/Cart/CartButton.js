import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartToggleActions } from "../../store/cart-toggle";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = (event) => {
    event.preventDefault();
    dispatch(cartToggleActions.toggleCart());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
