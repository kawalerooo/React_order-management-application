import { useState } from "react";
import classes from "./DropDownItem.module.css";

const DropDownItem = (props) => {
  // eslint-disable-next-line
  const [itemName, setItemName] = useState(props.name);
  const [isClicked, setIsClicked] = useState(false);

  const clickHandler = () => {
    if (isClicked === false) {
      setIsClicked(true);
      props.onItemClick(itemName);
      props.onCancel();
    } else {
      setIsClicked(false);
    }
  };

  return (
    <div className={classes.item} onClick={clickHandler}>
      <p>{props.name}</p>
    </div>
  );
};

export default DropDownItem;
