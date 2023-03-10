import { useState } from "react";
import DropDownItem from "./DropDownItem";
import classes from "./DropDownList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const DropDownList = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectBoxValue, setSelectBoxValue] = useState(props.title);

  const openHandler = () => {
    if (isOpen === false) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const itemClickHandler = (itemName) => {
    setSelectBoxValue(itemName);
    props.onCategoryChange(itemName);
  };

  return (
    <div className={classes.container}>
      <div className={classes.selectBox} onClick={openHandler}>
        {selectBoxValue === props.title && (
          <FontAwesomeIcon icon={faFolderOpen} className={classes.icons} />
        )}
        <p>{selectBoxValue}</p>
      </div>
      {isOpen && (
        <ul className={classes.dropDownMenu}>
          {props.categories.map((category) => (
            <li key={category.name}>
              <DropDownItem
                name={category.name}
                onItemClick={itemClickHandler}
                onCancel={openHandler}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownList;
