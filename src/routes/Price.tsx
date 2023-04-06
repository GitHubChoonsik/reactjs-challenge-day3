import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinHistory } from "../api";

const PricePenel = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
  * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  header {
    grid-column: 1 / span 3;
    h1 {
      font-size: 25px;
    }
  }
  nav {
    border-bottom: 1px solid ${(props) => props.theme.textColor};
    margin-bottom: 5px;
  }
`;

const ColoredDiv = styled.div<{ color: string }>`
  color: ${(props) => props.color};
`;

const plusColor = "#1e90ff";
const minusColor = "red";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
  error?: string;
}

interface PriceProps {
  coinId: string;
  current?: number;
}

function Price({ coinId, current }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 30000,
    }
  );

  let prev, prevDim, amount, amountDim, percent, percentDim;
  if (data && !("error" in data) && current) {
    prev = data[data.length - 1].close;
    prevDim = data[0].close;
    amount = current - prev;
    amountDim = current - prevDim;
    percent = amount / current;
    percentDim = amountDim / current;
  }

  return (
    <>
      {isLoading ? (
        "Loading price..."
      ) : "error" in data! ? (
        "No historical data..."
      ) : (
        <PricePenel>
          <header>
            <h1>Price Performance (USD)</h1>
          </header>
          <nav>Change</nav>
          <nav>Amount</nav>
          <nav>%</nav>
          <div>Today</div>
          <ColoredDiv
            color={amount ? (amount > 0 ? plusColor : minusColor) : "inherit"}
          >
            {amount
              ? amount > 0
                ? `+${amount.toFixed(5)}`
                : amount.toFixed(5)
              : ""}
          </ColoredDiv>
          <ColoredDiv
            color={percent ? (percent > 0 ? plusColor : minusColor) : "inherit"}
          >
            {percent
              ? percent > 0
                ? `+${percent.toFixed(5)}%`
                : `${percent.toFixed(5)}%`
              : ""}
          </ColoredDiv>
          <div>{data ? data.length : "n"} Days</div>
          <ColoredDiv
            color={
              amountDim ? (amountDim > 0 ? plusColor : minusColor) : "inherit"
            }
          >
            {amountDim
              ? amountDim > 0
                ? `+${amountDim.toFixed(5)}`
                : amountDim.toFixed(5)
              : ""}
          </ColoredDiv>
          <ColoredDiv
            color={
              percentDim ? (percentDim > 0 ? plusColor : minusColor) : "inherit"
            }
          >
            {percentDim
              ? percentDim > 0
                ? `+${percentDim.toFixed(5)}%`
                : `${percentDim.toFixed(5)}%`
              : ""}
          </ColoredDiv>
        </PricePenel>
      )}
    </>
  );
}

export default Price;
