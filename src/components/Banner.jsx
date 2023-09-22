import React, { useEffect, useState } from "react";
import { CryptoContext, useCryptoContext } from "../contexts/CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Banner = () => {
  const { currency, symbol } = useCryptoContext();
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    async function getTrending() {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
      ).then((res) => res.json());
      // .then((res) => res.coins);
      console.log(response);
      setCoins(response);
    }
    getTrending();
  }, [currency]);
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
  };

  const trendingItems = coins?.map((coin, i) => {
    let profit = coin?.price_change_percentage_24h >= 0;
    return (
      <Link to={`/coin/${coin.id}`} key={i}>
        <div className="max-w-[200px] flex flex-col gap-5 items-center max-sm:w-[50px]">
          <img
            className="max-w-[100px] max-h-[100px] max-sm:w-10"
            src={coin.image}
          ></img>
          <h2 className="text-white">
            {coin.symbol} &nbsp;
            <span
              style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
              }}
            >
              {profit && "+"}
              {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
          </h2>
          <h1 className="text-white ">
            {symbol} {coin.current_price}
          </h1>
        </div>
      </Link>
    );
  });

  return (
    <div className="bg-[url('/banner2.jpg')] bg-opacity-50 bg-center bg-no-repeat bg-cover py-10 ">
      <div className="w-full mx-auto flex flex-col items-center justify-center gap-20">
        <div className="text-white flex flex-col gap-5">
          <h1 className="text-6xl font-semibold">Crypto Tracker</h1>
          <p>Get All The Info Regrading Your Favourite Crypto Currency</p>
        </div>
        <div className="flex max-w-[1000px]  justify-center w-full gap-14 overflow-hidden ">
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableButtonsControls
            disableDotsControls
            autoPlay
            responsive={responsive}
            items={trendingItems}
          ></AliceCarousel>
        </div>
      </div>
    </div>
  );
};

export default Banner;
