import React, { useState } from 'react';
import { WalletContainer, BuySellButton, AmountInput, CurrencySelect } from '../assets/styles/WalletOperationsStyled';

interface Currency {
    name: string;
    rate: number;
}

interface Props<T extends { [key: string]: number }> {
    balance: T;
    rates: T;
    setBalance: React.Dispatch<React.SetStateAction<T>>;
    currencies: Currency[];
    setCurrentCurrency: React.Dispatch<React.SetStateAction<string>>;
}

function WalletOperations<T extends { [key: string]: number }>({ balance, rates, setBalance, currencies }: Props<T>) {
    const [selectedCurrency, setSelectedCurrency] = useState<string>(currencies[0].name);
    const [amount, setAmount] = useState<number>(0);

    const handleBuy = () => {
        const costInRub = amount * rates[selectedCurrency as keyof T];
        if (amount > 0 && balance['RUB'] >= costInRub) {
            setBalance(prevBalance => ({
                ...prevBalance,
                RUB: prevBalance['RUB'] - costInRub,
                [selectedCurrency]: (prevBalance as any)[selectedCurrency] + amount
            }));
        } else {
            alert('Insufficient funds in RUB.');
        }
    };

    const handleSell = () => {
        const rubGained = amount * rates[selectedCurrency as keyof T];
        if (amount > 0 && (balance as any)[selectedCurrency] >= amount) {
            setBalance(prevBalance => ({
                ...prevBalance,
                RUB: prevBalance['RUB'] + rubGained,
                [selectedCurrency]: (prevBalance as any)[selectedCurrency] - amount
            }));
        } else {
            alert(`Insufficient funds in ${selectedCurrency}.`);
        }
    };

    return (
        <WalletContainer>
            <p>Balance: {balance['RUB'].toFixed(2)} RUB, {(balance[selectedCurrency as keyof T] || 0).toFixed(2)} {selectedCurrency}</p>
            <CurrencySelect value={selectedCurrency} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCurrency(e.target.value)}>
                {currencies.map(currency => (
                    <option key={currency.name} value={currency.name}>{currency.name}</option>
                ))}
            </CurrencySelect>
            <AmountInput type="number" value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(Number(e.target.value))} placeholder="Amount" />
            <BuySellButton onClick={handleBuy}>Buy</BuySellButton>
            <BuySellButton onClick={handleSell}>Sell</BuySellButton>
        </WalletContainer>
    );
}

export default WalletOperations;