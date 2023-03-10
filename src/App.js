import "./App.css";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import FormPage from "./pages/FormPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginPage />}></Route>
        {localStorage.getItem("token") !== null && (
          <Route path="/form" element={<FormPage />}></Route>
        )}
        {localStorage.getItem("token") !== null && (
          <Route path="/list" element={<ListPage />}></Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
