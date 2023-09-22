import React, { useEffect, useState } from "react";
import { useCryptoContext } from "../contexts/CryptoContext";
import TableRow from "./TableRow";
import { BsSearch } from "react-icons/bs";

import ReactPaginate from "react-paginate";

const Table = () => {
  const { currency } = useCryptoContext();
  const [data, setData] = useState([]);
  const [Search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function tabledata() {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      ).then((res) => res.json());

      setData(response);
    }
    tabledata();
  }, [currency]);

  function handleSearch() {
    console.log(Search);

    return data.filter(
      (item) =>
        item.symbol.toLowerCase().includes(Search) ||
        item.name.toLowerCase().includes(Search) ||
        item.id.toLowerCase().includes(Search)
    );
  }

  return (
    <div className="text-white p-4 flex flex-col gap-4 max-w-[1200px] mx-auto min-h-[100vh]">
      <div>
        <h2 className="text-5xl text-center max-sm:text-xl">
          Cryptocurrency Prices by Market Cap
        </h2>
      </div>
      <div className="flex bg-white w-fit items-center px-2 py-1 rounded-lg">
        <BsSearch color="black" />
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className=" outline-none text-black px-3 w-[250px] max-sm:w-[100px]"
          placeholder="Search your Favourite Coin..."
          // value={Search}
        ></input>
      </div>
      <div className="grid grid-cols-5 p-2 bg-yellow-500 max-sm:grid-cols-3 max-sm:text-xs">
        <div className="col-span-2 max-sm:col-span-1">
          <h1>Coin</h1>
        </div>
        <div>
          <h2>Price</h2>
        </div>
        <div>
          <h2>24h Change</h2>
        </div>
        <h2 className="max-sm:hidden">Market Cap</h2>
      </div>
      <div>
        {handleSearch()
          .slice((page - 1) * 10, (page - 1) * 10 + 10)
          .map((item, i) => {
            return <TableRow item={item} key={i} id={i + 1} />;
          })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={({ selected }) => {
          setPage(selected + 1);
          window.scroll(0, 450);
        }}
        pageRangeDisplayed={2}
        pageCount={10}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="flex gap-5 justify-center items-center w-full"
        pageClassName=" block w-10 h-10 rounded-lg hover:bg-[#EEEC1d] flex justify-center items-center hover:text-black "
        activeClassName="bg-[#EEEC1D] text-black"
      />

      {/* <Paginate /> */}
    </div>
  );
};

export default Table;
