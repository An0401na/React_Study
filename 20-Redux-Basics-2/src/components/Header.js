import classes from "./Header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticatedState = useSelector(
    (state) => state.auth.isAuthenticated,
  );

  const logoutHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.logout());
  };
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      <nav>
        {isAuthenticatedState ? (
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        ) : null}
      </nav>
    </header>
  );
};

export default Header;
