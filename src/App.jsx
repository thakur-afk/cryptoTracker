import Banner from "./components/Banner";
import Header from "./components/Header";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Table from "./components/Table";
import Coin from "./components/Coin";
import { useCryptoContext } from "./contexts/CryptoContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const { currency } = useCryptoContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="coin/:id" element={<Coin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
