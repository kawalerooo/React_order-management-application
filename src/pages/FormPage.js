import Navigation from "../components/Navigation";
import TextArea from "../components/TextArea";
import classes from "./FormPage.module.css";
import DropDownList from "../components/DropDownList";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Input from "../components/Input";
import useHttp from "../hooks/use-http";
import { addOrder } from "../lib/api";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router";

const categories = [
  { name: "Alibi" },
  { name: "Figaro" },
  { name: "Magnum" },
  { name: "Amarant" },
  { name: "Diana" },
  { name: "Kairo" },
  { name: "Mistic" },
  { name: "Andre" },
  { name: "Carla" },
  { name: "Elizabeth" },
  { name: "Intro" },
  { name: "Lilly" },
  { name: "Picasso" },
  { name: "Preston" },
  { name: "Rico" },
  { name: "Salwador" },
  { name: "Verso" },
  { name: "Virdi" },
  { name: "Vinci" },
];

const categories2 = [
  { name: "Art1" },
  { name: "Art2" },
  { name: "Art3" },
  { name: "Art4" },
  { name: "Art5" },
  { name: "Art6" },
  { name: "Art7" },
  { name: "Art8" },
  { name: "Art9" },
  { name: "Art10" },
  { name: "Art11" },
  { name: "Art12" },
  { name: "Art13" },
  { name: "Art14" },
  { name: "Art15" },
];

const FormPage = () => {
  const { sendRequest } = useHttp(addOrder);
  const navigate = useNavigate();
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [categorySecondInputValue, setCategorySecondInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");
  const [surnameInputValue, setSurnameInputValue] = useState("");
  const [adresInputValue, setAdresInputValue] = useState("");
  const [postalCodeInputValue, setPostalCodeInputValue] = useState("");

  const [descriptionIsCorrect, setDescriptionIsCorrect] = useState(true);
  const [nameIsCorrect, setNameIsCorrect] = useState(true);
  const [surnameIsCorrect, setSurnameIsCorrect] = useState(true);
  const [adresIsCorrect, setAdresIsCorrect] = useState(true);
  const [postalIsCorrect, setPostalIsCorrect] = useState(true);

  const changeCategoryHandler = (category) => {
    setCategoryInputValue(category);
  };

  const changeCategoryHandlerSecond = (category) => {
    setCategorySecondInputValue(category);
  };

  const changeNameHandler = (event) => {
    setNameInputValue(event.target.value);
  };

  const changeSurnameHandler = (event) => {
    setSurnameInputValue(event.target.value);
  };

  const changeAdresHandler = (event) => {
    setAdresInputValue(event.target.value);
  };

  const changePostalCodeHandler = (event) => {
    setPostalCodeInputValue(event.target.value);
  };

  const changeDescriptionHandler = (event) => {
    setDescriptionInputValue(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (nameInputValue === "") {
      setNameIsCorrect(false);
      localStorage.setItem("error", true);
      return;
    }
    if (surnameInputValue === "") {
      setSurnameIsCorrect(false);
      localStorage.setItem("error", true);
      return;
    }
    if (adresInputValue === "") {
      setAdresIsCorrect(false);
      localStorage.setItem("error", true);
      return;
    }
    if (postalCodeInputValue === "") {
      setPostalIsCorrect(false);
      localStorage.setItem("error", true);
      return;
    }
    if (descriptionInputValue === "") {
      setDescriptionIsCorrect(false);
      localStorage.setItem("error", true);
      return;
    }
    if (categoryInputValue === "" || categorySecondInputValue === "") {
      localStorage.setItem("error", true);
      return;
    }

    const id = Math.random();
    sendRequest({
      additional: descriptionInputValue,
      adres: adresInputValue,
      id: id,
      item: categoryInputValue + " " + categorySecondInputValue,
      name: nameInputValue,
      postal: postalCodeInputValue,
      stan: "Zlecone do produkcji",
      surname: surnameInputValue,
    });

    var templateParams = {
      name: "atak2001@wp.pl",
      name2: "michal-kurtys@wp.pl",
      message: `${nameInputValue}, ${surnameInputValue}, ${adresInputValue},${postalCodeInputValue} ,${
        categoryInputValue + " " + categorySecondInputValue
      }, ${descriptionInputValue}`,
    };

    emailjs
      .send(
        "service_4umyyvd",
        "template_ugs705d",
        templateParams,
        "-XzRK96iwbkhHOAfM"
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );

    localStorage.removeItem("error");
    navigate("/list");
  };
  let error;
  if (localStorage.getItem("error")) {
    error = (
      <p className={classes.error}>Coś poszło nie tak wpisz dane ponownie</p>
    );
  }

  return (
    <>
      <Navigation />
      <div className={classes.container}>
        <h1>Składanie zamówienia</h1>
        {error}
        <form onSubmit={submitHandler}>
          <div className={classes.DropDownList}>
            <DropDownList
              title={"Wybierz system"}
              categories={categories}
              onCategoryChange={changeCategoryHandler}
            />
          </div>
          <div className={classes.DropDownList}>
            <DropDownList
              title={"Wybierz artykuł"}
              categories={categories2}
              onCategoryChange={changeCategoryHandlerSecond}
            />
          </div>
          <Input
            placeholder="Imie"
            icon={faUser}
            type="text"
            onChange={changeNameHandler}
            value={nameInputValue}
            isCorrect={nameIsCorrect}
          />
          <Input
            placeholder="Nazwisko"
            icon={faUser}
            type="text"
            onChange={changeSurnameHandler}
            value={surnameInputValue}
            isCorrect={surnameIsCorrect}
          />
          <Input
            placeholder="Adres zamieszkania"
            icon={faUser}
            type="text"
            onChange={changeAdresHandler}
            value={adresInputValue}
            isCorrect={adresIsCorrect}
          />
          <Input
            placeholder="Kod Pocztowy"
            icon={faUser}
            type="text"
            onChange={changePostalCodeHandler}
            value={postalCodeInputValue}
            isCorrect={postalIsCorrect}
          />
          <TextArea
            placeholder="Dodatkowe informacje..."
            icon={faFileAlt}
            type="textarea"
            onChange={changeDescriptionHandler}
            value={descriptionInputValue}
            isCorrect={descriptionIsCorrect}
          />
          <input type="submit" value="Wyślij formularz" />
        </form>
      </div>
    </>
  );
};

export default FormPage;
