import classes from "./Navigation.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faPenFancy,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const onLogoutHandler = () => {
    dispatch(authActions.logOut());
    navigation("/");
  };

  let nav;
  if (location.pathname === "/form") {
    nav = (
      <NavLink className={classes.link} to={"/list"}>
        <FontAwesomeIcon icon={faClipboardList} className={classes.icon} />
        <p>List</p>
      </NavLink>
    );
  } else if (location.pathname === "/list") {
    nav = (
      <NavLink className={classes.link} to={"/form"}>
        <FontAwesomeIcon icon={faPenFancy} className={classes.icon} />
        <p>Form</p>
      </NavLink>
    );
  }

  return (
    <div className={classes.container}>
      {nav}
      <button onClick={onLogoutHandler} className={classes.link}>
        <FontAwesomeIcon icon={faPowerOff} className={classes.icon} />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default Navigation;
