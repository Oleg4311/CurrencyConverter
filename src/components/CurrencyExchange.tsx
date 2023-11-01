import React, { useState } from 'react';

const CurrencyExchange: React.FC = () => {
    const [selectedCurrency, setSelectedCurrency] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCurrency(event.target.value);
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(event.target.value));
    };

    const handleBuy = () => {
        // Implement buy logic here
        console.log(`Buying ${amount} of ${selectedCurrency}`);
    };

    return (
        <div>
            <h2>Currency Exchange</h2>
            <form>
                <label>Select Currency:</label>
                <select value={selectedCurrency} onChange={handleCurrencyChange}>
                    {/* Populate with available currencies */}
                </select>
                <label>Amount:</label>
                <input type="number" value={amount} onChange={handleAmountChange} />
                <button type="button" onClick={handleBuy}>
                    Buy
                </button>
            </form>
        </div>
    );
};

export default CurrencyExchange;