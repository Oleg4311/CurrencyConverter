import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataThunk,
  selectCurrencies,
  selectLatestRates,
  selectStatus,
} from "../redux/exchangeSlice";
import { AppDispatch } from "../redux/store";
import {
  ConverterContainer,
  ConversionControls,
  StyledConvertButton,
  StyledSuccessResult,
} from "../assets/styles/CurrencyConverterStyled";

const CurrencyConverter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const latestRates = useSelector(selectLatestRates);
  const availableCurrencies = useSelector(selectCurrencies);
  const status = useSelector(selectStatus);
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("GBP");
  const [toCurrency, setToCurrency] = useState<string>("CNY");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  useEffect(() => {
    if (!availableCurrencies) {
      dispatch(fetchDataThunk({ type: "currencies" }));
    }
  }, [dispatch, availableCurrencies]);

  useEffect(() => {
    if (!latestRates) {
      dispatch(fetchDataThunk({ type: "latestRates" }));
    }
  }, [dispatch, latestRates]);

  if (status === "loading" && !latestRates) {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading data</div>;
  }

  if (!latestRates) {
    return <div>No available currency rates</div>;
  }

  const convertCurrency = () => {
    if (latestRates) {
      const rateFrom = latestRates[fromCurrency];
      const rateTo = latestRates[toCurrency];
      if (
        typeof rateFrom === "number" &&
        typeof rateTo === "number" &&
        !isNaN(rateFrom) &&
        !isNaN(rateTo) &&
        !isNaN(amount)
      ) {
        const converted = (amount * rateTo) / rateFrom;
        setConvertedAmount(converted);
      } else {
        setConvertedAmount(null);
      }
    }
  };

  return (
    <ConverterContainer>
      <h2>Конвертер валют</h2>
      <ConversionControls>
        <input
          type="number"
          value={amount}
          min="0"
          onChange={(e) => {
            const inputValue = parseFloat(e.target.value);
            if (inputValue >= 0) {
              setAmount(inputValue);
            }
          }}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {availableCurrencies ? (
            Object.keys(availableCurrencies).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option>Loading currencies...</option>
          )}
        </select>
        в
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {availableCurrencies ? (
            Object.keys(availableCurrencies).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option>Loading currencies...</option>
          )}
        </select>
        <StyledConvertButton onClick={convertCurrency}>
          Конвертировать
        </StyledConvertButton>
      </ConversionControls>
      {convertedAmount !== null ? (
        <StyledSuccessResult>
          {amount} {fromCurrency} равно {convertedAmount.toFixed(2)}{" "}
          {toCurrency}
        </StyledSuccessResult>
      ) : null}
    </ConverterContainer>
  );
};

export default CurrencyConverter;
