import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import { useRecoilValue } from "recoil";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: false, // TODO
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => {
                  const date = new Date(price.time_open * 1000);
                  const year = date.getFullYear();
                  const month = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const day = date.getDate().toString().padStart(2, "0");
                  return {
                    x: `${year}-${month}-${day}`,
                    y: [price.open, price.high, price.low, price.close],
                  };
                }) ?? [],
              // data: [
              //   {
              //     x: new Date(1538778600000),
              //     y: [6629.81, 6650.5, 6623.04, 6633.33],
              //   },
              //   {
              //     x: new Date(1538780400000),
              //     y: [6632.01, 6643.59, 6620, 6630.11],
              //   },
              // ],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "category",
              labels: {
                formatter: (value) => {
                  return value;
                },
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: true,
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;
