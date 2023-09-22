import React from "react";
import { Link } from "react-router-dom";
import { useCryptoContext } from "../contexts/CryptoContext";

const TableRow = ({ item, id }) => {
  const { symbol } = useCryptoContext();
  const profit = item.price_change_percentage_24h > 0;

  return (
    <Link to={`/coin/${item.id}`}>
      <div className="grid grid-cols-5 p-4    border-b-[1px] border-white bg-[#16171a] hover:bg-[#131111] max-sm:grid-cols-3 max-sm:text-xs">
        <div className="flex  items-center gap-10 justify-start col-span-2 shrink-1 max-sm:col-span-1 max-sm:gap-2">
          <img className="h-[50px] max-sm:h-[30px]" src={item.image}></img>
          <div className="flex flex-col gap-1 max-sm:hidden">
            <h2>{item.symbol}</h2>
            <h2>{item.name}</h2>
          </div>
        </div>
        <div>
          <h2>
            {symbol} {item.current_price.toFixed(2)}
          </h2>
        </div>
        <div>
          <h2 className={`${profit ? "text-green-500" : "text-red-500"}`}>
            {profit && "+"} {item.price_change_percentage_24h.toFixed(2)} %
          </h2>
        </div>
        <h2 className="max-sm:hidden">
          {symbol} {item.market_cap}
        </h2>
      </div>
    </Link>
  );
};

export default TableRow;
