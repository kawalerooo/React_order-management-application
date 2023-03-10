import classes from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index";

const LoginPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginInputValue, setLoginInputValue] = useState("");
  const [passInputValue, setPassInputValue] = useState("");
  const [dataIsCorrect, setDataIsCorrect] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArU8-mH_2inAv1QuLX3vQpNWiQR-cUTaA",
      {
        method: "POST",
        body: JSON.stringify({
          email: loginInputValue,
          password: passInputValue,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            setDataIsCorrect(false);
            console.log(data);
            throw new Error("Authentication Failed!");
          });
        }
      })
      .then((data) => {
        console.log("zalogowano");
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        dispatch(authActions.logIn(data.idToken));
        autoLogoutHandler(expirationTime);
        navigate("/form");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const autoLogoutCalculator = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
  };

  const autoLogoutHandler = (expirationTime) => {
    const remainingDuration = autoLogoutCalculator(expirationTime);
    setTimeout(() => {
      navigate("/");
      dispatch(authActions.logOut());
    }, remainingDuration);
  };

  const changeLoginHandler = (event) => {
    setLoginInputValue(event.target.value);
  };
  const changePasswordHandler = (event) => {
    setPassInputValue(event.target.value);
  };

  return (
    <div className={classes.container}>
      {/* <section>
        <div className={classes.skewed}></div>
      </section> */}
      <form onSubmit={submitHandler}>
        <h1>Logowanie</h1>
        {!dataIsCorrect && (
          <div className={classes.error}>
            <p className={classes.errorMessage}>Podano zły login lub hasło</p>
          </div>
        )}
        <Input
          placeholder="Login"
          icon={faUser}
          type="text"
          onChange={changeLoginHandler}
          value={loginInputValue}
          isCorrect={dataIsCorrect}
        />
        <Input
          placeholder="Hasło"
          icon={faLock}
          type="password"
          onChange={changePasswordHandler}
          value={passInputValue}
          isCorrect={dataIsCorrect}
        />
        <input type="submit" value="Zaloguj" />
      </form>
      <div className={classes.devider}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className={classes.fill}
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className={classes.fill}
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className={classes.fill}
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default LoginPage;
