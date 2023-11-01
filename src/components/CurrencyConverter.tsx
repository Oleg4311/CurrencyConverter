import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDataThunk,
    selectCurrencies,
    selectLatestRates,
    selectStatus,
} from '../redux/exchangeSlice';
import { AppDispatch } from '../redux/store';
import {
    StyledConvertButton,
    StyledConvertedResult,
    StyledSuccessResult,
    StyledErrorResult,
} from '../assets/styles/CurrencyConverterStyled';

const CurrencyConverter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const latestRates = useSelector(selectLatestRates);
    const availableCurrencies = useSelector(selectCurrencies);
    const status = useSelector(selectStatus);
    const [amount, setAmount] = useState<number>(1);
    const [fromCurrency, setFromCurrency] = useState<string>('GBP');
    const [toCurrency, setToCurrency] = useState<string>('CNY');
    const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!latestRates) {
            dispatch(fetchDataThunk({ type: 'latestRates' }));
        }
    }, [dispatch, latestRates]);

    useEffect(() => {
        if (latestRates && availableCurrencies) {
            setDataLoaded(true);
        }
    }, [latestRates, availableCurrencies]);

    if (!dataLoaded) {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error loading data</div>;
    }

    const convertCurrency = () => {
        if (latestRates) {
            const rateFrom = latestRates[fromCurrency];
            const rateTo = latestRates[toCurrency];
            if (
                typeof rateFrom === 'number' &&
                typeof rateTo === 'number' &&
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
        <div>
            <h2>Конвертер валют</h2>
            <div>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
                <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                >
                    {availableCurrencies &&
                        Object.keys(availableCurrencies).map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                </select>
                в
                <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                >
                    {availableCurrencies &&
                        Object.keys(availableCurrencies).map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                </select>
                <StyledConvertButton onClick={convertCurrency}>Конвертировать</StyledConvertButton>
            </div>
            {convertedAmount !== null ? (
                <StyledSuccessResult>
                    {amount} {fromCurrency} равно {convertedAmount.toFixed(2)} {toCurrency}
                </StyledSuccessResult>
            ) : (
                <StyledErrorResult>Результат конвертации будет отображен здесь.</StyledErrorResult>
            )}
        </div>
    );
};

export default CurrencyConverter;
