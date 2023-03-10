import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getOrderIDs } from "../lib/api";
import classes from "./Table.module.css";

const Table = (props) => {
  const { sendRequest, data: loadedOrders } = useHttp(getOrderIDs, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const deleteHandler = async (id) => {
    let orderDataFinal = [];
    for (const key in loadedOrders) {
      let orderData = [];
      orderData.push(loadedOrders[key]);
      orderData.map((item) => {
        if (item.id === id) {
          orderDataFinal.push(key);
          return;
        }
      });
    }

    const response = await fetch(
      `https://zpo-projekt-default-rtdb.europe-west1.firebasedatabase.app/orders/${orderDataFinal}.json`,
      {
        method: "DELETE",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    props.onUpdate();
  };

  const updateHandler = async (id) => {
    let newStateValue;
    let orderDataFinal = [];
    for (const key in loadedOrders) {
      let orderData = [];
      orderData.push(loadedOrders[key]);
      orderData.map((item) => {
        if (item.id === id) {
          orderDataFinal.push(key);
          if (item.stan === "Zlecone do produkcji") {
            newStateValue = "Produkcja";
          } else if (item.stan === "Produkcja") {
            newStateValue = "Wyprodukowano";
          }
          return;
        }
      });
    }
    const response = await fetch(
      `https://zpo-projekt-default-rtdb.europe-west1.firebasedatabase.app/orders/${orderDataFinal}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ stan: newStateValue }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    props.onUpdate();
  };

  return (
    <div className={classes.container}>
      <table>
        <thead>
          <tr>
            <th>Imie</th>
            <th>Nazwisko</th>
            <th>Adres Zamieszkania</th>
            <th>Kod Pocztowy</th>
            <th>Artykuł</th>
            <th>Dodatkowe informacje</th>
            <th>Stan Zamówienia</th>
            <th>Zmiana stanu Zamówienia</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.adres}</td>
              <td>{item.postal}</td>
              <td>{item.item}</td>
              <td>{item.additional}</td>
              <td>{item.stan}</td>
              {item.stan === "Zlecone do produkcji" && (
                <td className={classes.row}>
                  <button
                    onClick={() => updateHandler(item.id)}
                    className={classes.btn}
                  >
                    Produkcja
                  </button>
                </td>
              )}
              {item.stan === "Produkcja" && (
                <td className={classes.row}>
                  <button
                    onClick={() => updateHandler(item.id)}
                    className={classes.btn}
                  >
                    Wyprodukowano
                  </button>
                </td>
              )}
              {item.stan === "Wyprodukowano" && (
                <td className={classes.row}>
                  <button
                    onClick={() => deleteHandler(item.id)}
                    className={classes.btn}
                  >
                    Usuń
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
