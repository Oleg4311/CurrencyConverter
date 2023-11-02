import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LineController,
  PointElement,
  LineElement,
  LinearScale,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataThunk,
  selectTimeSeriesData,
  selectCurrencies, 
  selectBase,
} from "../redux/exchangeSlice";
import {
    StyledCurrencyChart,
    ChartHeader,
    ChartSelect,
    ChartControls,
    getDatasetStyles,
  } from "../assets/styles/CurrencyChartStyled";
import { AppDispatch } from "../redux/store";

Chart.register(
  CategoryScale,
  LineController,
  PointElement,
  LineElement,
  LinearScale
);

type TimeSeriesEntry = {
  [currency: string]: number;
};

type TimeSeriesData = {
  [date: string]: TimeSeriesEntry;
};

const CurrencyChart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const timeSeriesData: TimeSeriesData | undefined =
    useSelector(selectTimeSeriesData);
  const availableCurrencies = useSelector(selectCurrencies);
  const base = useSelector(selectBase);

  const [period, setPeriod] = useState<number>(7);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("GBP");

  useEffect(() => {
    if (!availableCurrencies) {
      dispatch(fetchDataThunk({ type: "currencies" }));
    }

    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - period);

    dispatch(
      fetchDataThunk({
        type: "timeSeriesRates",
        params: {
          startDate: startDate.toISOString().split("T")[0],
          endDate: today.toISOString().split("T")[0],
        },
      })
    );
  }, [selectedCurrency, period, dispatch, availableCurrencies]);

  const labels = timeSeriesData ? Object.keys(timeSeriesData) : [];

  const dataset = timeSeriesData
    ? Object.values(timeSeriesData).map((data) => data[selectedCurrency] || 0)
    : [];

  const currencyLabel =
    availableCurrencies && selectedCurrency in availableCurrencies
      ? availableCurrencies[selectedCurrency]
      : selectedCurrency;

  const data = {
    labels: labels,
    datasets: [
      {
        ...getDatasetStyles(selectedCurrency),
        label: currencyLabel,
        data: dataset,
      },
    ],
  };

  return (
    <StyledCurrencyChart>
      <ChartHeader>График колебания курса {selectedCurrency} к {base}</ChartHeader>
      <ChartControls>
        <select
          value={selectedCurrency}
          onChange={(e) => setSelectedCurrency(e.target.value)}
        >
          {availableCurrencies &&
            Object.keys(availableCurrencies).map((currencyCode) => (
              <option key={currencyCode} value={currencyCode}>
                {availableCurrencies[currencyCode]}
              </option>
            ))}
        </select>
        <ChartSelect
          value={period}
          onChange={(e) => setPeriod(Number(e.target.value))}
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
          <option value={365}>Last 365 days</option>
        </ChartSelect>
      </ChartControls>
      <Line data={data} />
    </StyledCurrencyChart>
  );
};

export default CurrencyChart;
