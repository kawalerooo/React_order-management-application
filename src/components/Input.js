import classes from "./Input.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const Input = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isCorrect, setIsCorrect] = useState("");

  useEffect(() => {
    if (props.isCorrect !== undefined) {
      setIsCorrect(props.isCorrect);
    } else {
      setIsCorrect(true);
    }
  }, [props.isCorrect, props.value]);

  const changeHandler = (event) => {
    if (event.target.value === "") {
      setIsText(false);
      focusHandler();
    } else {
      setIsText(true);
    }
  };

  const focusHandler = () => {
    if (isText === false) {
      setIsFocused(true);
    }
  };

  const blurHandler = () => {
    if (isText === false) {
      setIsFocused(false);
    }
  };

  return (
    <div className={classes.input}>
      {!isFocused && props.icon && (
        <FontAwesomeIcon icon={props.icon} className={classes.icon} />
      )}
      {!isFocused && <label>{props.placeholder}</label>}
      <input
        type={props.type}
        onFocus={focusHandler}
        onBlur={blurHandler}
        onChange={changeHandler}
        onChangeCapture={props.onChange}
        value={props.value}
        className={isCorrect ? "" : classes.incorrect}
      />
    </div>
  );
};

export default Input;
