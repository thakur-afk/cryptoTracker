import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCryptoContext } from "../contexts/CryptoContext";
import CoinGraph from "./CoinGraph";
import HTMLReactParser from "html-react-parser";
import parse from "html-react-parser";

const Coin = () => {
  const { id } = useParams();
  const { currency, symbol } = useCryptoContext();

  const [singleCoinData, setSingleCoinData] = useState();

  useEffect(() => {
    async function singleCoinData() {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      ).then((res) => res.json());
      console.log(response);
      setSingleCoinData(response);
    }
    singleCoinData();
    // console.log(setSingleCoinData);
  }, [id]);

  return (
    <div className="text-white bg-[#14161a] flex  max-md:flex-col p-5 min-h-[90vh]">
      <div className="flex flex-col flex-[30%] gap-5 items-start   justify-start md:border-r-2 p-3 ">
        <div className="grid place-items-center">
          <img
            className="w-[150px]"
            src={`${singleCoinData?.image.large}`}
          ></img>
        </div>
        <h1 className="text-white font-bold text-3xl">
          {singleCoinData?.name}
        </h1>
        <h2 className="">
          {singleCoinData
            ? parse(singleCoinData.description.en.split(". ")[0])
            : ""}
        </h2>
        <h2 className="text-lg font-bold">
          RANK :{" "}
          <span className=" font-normal">
            {singleCoinData?.market_cap_rank}
          </span>
        </h2>
        <h2 className="text-lg font-bold">
          CURRENT PRICE :{" "}
          <span className=" font-normal">
            {" "}
            {symbol}{" "}
            {singleCoinData?.market_data.current_price[currency.toLowerCase()]}
          </span>
        </h2>
        <h2 className="text-lg font-bold">
          MARKET CAP :{" "}
          <span className=" font-normal">
            {" "}
            {symbol}{" "}
            {singleCoinData?.market_data.market_cap[currency.toLowerCase()]}
          </span>
        </h2>
      </div>
      <div className="flex-[70%]">
        <CoinGraph id={singleCoinData?.id} />
      </div>
    </div>
  );
};

export default Coin;
