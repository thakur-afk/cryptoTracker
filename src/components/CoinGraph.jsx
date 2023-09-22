import React, { useEffect, useState } from "react";
import { useCryptoContext } from "../contexts/CryptoContext";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { chartDays } from "../components/config/data";
ChartJS.register(...registerables);

const CoinGraph = ({ id }) => {
  const { currency } = useCryptoContext();
  const [days, setDays] = useState(365);
  const [flag, setFlag] = useState(false);
  const [historicData, setHistoricData] = useState();

  async function fetchHistoricData(days = 365, id = "bitcoin") {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    )
      .then((res) => res.json())
      .then((res) => res.prices);
    setFlag(true);
    setHistoricData(response);
    console.log(response);
  }

  useEffect(() => {
    fetchHistoricData(days, id);
  }, [currency, days]);

  return (
    <div className="px-5">
      {!historicData | (flag === false) ? (
        "searchin.."
      ) : (
        <>
          <Line
            data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </>
      )}
      <div>
        {chartDays.map((day) => (
          <button
            onClick={() => setDays(day.value)}
            className={` border-[1px] m-5 px-5 border-[#EEBC1D] hover:bg-[#EEBC1D] hover:text-black rounded-lg ${
              days == day.value ? "bg-[#EEBC1d] text-black" : ""
            }`}
            key={1}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinGraph;
