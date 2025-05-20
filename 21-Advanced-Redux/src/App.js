import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { uiAction } from "./store/ui-slice";

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(
      uiAction.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      }),
    );
    const sendCartData = async () => {
      const response = await fetch("http://localhost:4000/cart", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success!",
          message: "Sending cart data successfully!",
        }),
      );
    };

    sendCartData().catch((error) => {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        }),
      );
    });
  }, [cart, dispatch]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
