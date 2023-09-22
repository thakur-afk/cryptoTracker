import React from "react";
import { useCryptoContext } from "../contexts/CryptoContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { currency, setCurrency } = useCryptoContext();
  return (
    <div className="bg-black px-20  py-3 max-sm:px-5">
      <div className="flex justify-between  mx-auto items-center">
        <div>
          <Link to="/">
            <h1 className="text-yellow-500 font-bold text-3xl cursor-pointer max-sm:text-xl">
              CryptoTracker.
            </h1>
          </Link>
        </div>
        <div>
          <select
            onChange={(e) => {
              setCurrency(e.target.value);
              console.log(currency);
            }}
            className=" bg-black md:p-1 rounded-md cursor-pointer text-white border-2 border-white md:text-lg"
          >
            <option className="p-2" value={"USD"}>
              USD
            </option>
            <option className="p-2 " value={"INR"}>
              INR
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
