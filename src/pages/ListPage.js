import Navigation from "../components/Navigation";
import Table from "../components/Table";
import useHttp from "../hooks/use-http";
import { getAllItems } from "../lib/api";
import { useEffect } from "react";
import classes from "./ListPage.module.css";

const ListPage = () => {
  const {
    sendRequest,
    status,
    data: loadedItems,
    error,
  } = useHttp(getAllItems, true);

  useEffect(() => {
    sendRequest();
    localStorage.removeItem("error");
  }, [sendRequest]);

  let info;
  if (status === "pending") {
    info = <h2 style={{ margin: "20px" }}>Wczytywanie zamówień</h2>;
  }

  if (error) {
    info = <h2 style={{ margin: "20px" }}>Wystąpił błąd</h2>;
  }

  if (status === "completed" && (!loadedItems || loadedItems.length === 0)) {
    info = <h2 style={{ margin: "20px" }}>Brak zamówień</h2>;
  }

  const onUpdateHandler = () => {
    sendRequest();
  };

  return (
    <>
      <Navigation />
      <h1 className={classes.title}>Lista zamówień</h1>
      {info}
      {status === "completed" &&
        !(!loadedItems || loadedItems.length === 0) && (
          <Table data={loadedItems} onUpdate={onUpdateHandler} />
        )}
    </>
  );
};

export default ListPage;
