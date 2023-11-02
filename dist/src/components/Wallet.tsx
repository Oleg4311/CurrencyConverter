import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDataThunk, selectCurrencies, selectLatestRates, selectStatus } from '../redux/exchangeSlice';
import { AppDispatch } from '../redux/store';
import { WalletContainer, BuySellButton, AmountInput, CurrencySelect } from '../assets/styles/WalletOperationsStyled';

function WalletOperations() {
    const rates = useSelector(selectLatestRates) || {};
    const currenciesList = useSelector(selectCurrencies);
    const status = useSelector(selectStatus);
    const currencies = Object.keys(currenciesList || {}).map(key => ({ name: key, rate: rates[key] }));
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDataThunk({ type: 'currencies' }));
        dispatch(fetchDataThunk({ type: 'latestRates' }));
    }, [dispatch]);

    const [balance, setBalance] = useState<{ [key: string]: number }>({
        RUB: 1000000
    });

    const [selectedCurrency, setSelectedCurrency] = useState<string>("");

    useEffect(() => {
        if (currencies.length > 0 && !selectedCurrency) {
            setSelectedCurrency(currencies[0].name);
        }
    }, [currencies]);

    const [amount, setAmount] = useState<number>(0);

    const handleBuy = () => {
        const rubRate = rates['RUB'] ? 1 / rates['RUB'] : 1;
        const costInRub = amount * rates[selectedCurrency] * rubRate;

        if (amount > 0 && balance['RUB'] >= costInRub) {
            setBalance(prevBalance => ({
                ...prevBalance,
                RUB: prevBalance['RUB'] - costInRub,
                [selectedCurrency]: (prevBalance[selectedCurrency] || 0) + amount
            }));
        } else {
            alert('Insufficient funds in RUB.');
        }
    };

    const handleSell = () => {
        const rubGained = amount * rates[selectedCurrency];
        if (amount > 0 && (balance[selectedCurrency] || 0) >= amount) {
            setBalance(prevBalance => ({
                ...prevBalance,
                RUB: prevBalance['RUB'] + rubGained,
                [selectedCurrency]: prevBalance[selectedCurrency] - amount
            }));
        } else {
            alert(`Insufficient funds in ${selectedCurrency}.`);
        }
    };

    if (status !== 'succeeded') {
        return <div>Loading...</div>;
    }

    return (
        <WalletContainer>
            <p>Balance: {balance['RUB'].toFixed(2)} RUB, {(balance[selectedCurrency] || 0).toFixed(2)} {selectedCurrency}</p>
            <label>Выбранная валюта: {currenciesList[selectedCurrency]}</label>
            <CurrencySelect value={selectedCurrency} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCurrency(e.target.value)}>
                {currencies.map(currency => (
                    <option key={currency.name} value={currency.name}>{currency.name}</option>
                ))}
            </CurrencySelect>
            <label>Количество: </label>
            <AmountInput
                type="number"
                value={amount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))}
                placeholder="Amount"
                min="0"
                step="1"
            />
            <BuySellButton onClick={handleBuy}>Buy</BuySellButton>
            <BuySellButton onClick={handleSell}>Sell</BuySellButton>
        </WalletContainer>
    );
}

export default WalletOperations;
