import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { Fragment, useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        }),
      );
      const response = await fetch("http://localhost:4000/cart", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending cart data successfully!",
        }),
      );
    };

    sendCartData().catch(() => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        }),
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
