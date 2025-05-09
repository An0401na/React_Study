import Counter from "./components/Counter";
import { Fragment } from "react";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import UserProfile from "./components/UserProfile";

function App() {
  const isAuthenticatedState = useSelector(
    (state) => state.auth.isAuthenticated,
  );
  return (
    <Fragment>
      <Header />
      {isAuthenticatedState && <UserProfile />}
      {!isAuthenticatedState && <Auth />}
      <Counter />
    </Fragment>
  );
}

export default App;
