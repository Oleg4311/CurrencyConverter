import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import CurrencyList from './components/CurrencyList';
import WalletOperations from './components/Wallet';
import CurrencyChart from './components/CurrencyChart';

import { LightTheme } from './assets/styles/themes/light-theme';
import { DarkTheme } from './assets/styles/themes/dark-theme';
import GlobalStyle from './assets/styles/GlobalStyles';
import AppContainer from './assets/styles/AppStyled';

type Theme = 'light' | 'dark';

interface CurrencyData {
    date: string;
    rate: number;
    name: string;
}

const dummyCurrencies = [
    { name: 'USD', rate: 75 },
    { name: 'EUR', rate: 90 },
    // ... другие валюты
];

const mockCurrencyData: {
    [key: string]: CurrencyData[];
} = {
    USD: [
        { date: '2023-01-01', rate: 73.5, name: 'USD' },
        { date: '2023-01-02', rate: 73.7, name: 'USD' },
        { date: '2023-01-03', rate: 73.6, name: 'USD' },
        { date: '2023-01-04', rate: 73.8, name: 'USD' },
        { date: '2023-01-05', rate: 73.9, name: 'USD' },
        { date: '2023-01-06', rate: 74.0, name: 'USD' },
        { date: '2023-01-07', rate: 74.2, name: 'USD' },
    ],
    EUR: [
        { date: '2023-01-01', rate: 88.5, name: 'EUR' },
        { date: '2023-01-02', rate: 88.6, name: 'EUR' },
        { date: '2023-01-03', rate: 88.7, name: 'EUR' },
        { date: '2023-01-04', rate: 89.0, name: 'EUR' },
        { date: '2023-01-05', rate: 89.1, name: 'EUR' },
        { date: '2023-01-06', rate: 89, name: 'EUR' },
        { date: '2023-01-07', rate: 89.4, name: 'EUR' },
    ],
    // ... данные для других валют
};

const App: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState('CurrencyList');
    const [theme, setTheme] = useState<Theme>('light');
    const [balance, setBalance] = useState({
        RUB: 10000,
        USD: 0,
        EUR: 0,
    });
    const [rates, setRates] = useState({
        RUB: 1,
        USD: 75,
        EUR: 90,
    });
    const [currentCurrency, setCurrentCurrency] = useState<string>(dummyCurrencies[0].name);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'CurrencyList':
                return <CurrencyList />;
            case 'WalletOperations':
                return (
                    <WalletOperations
                        currencies={dummyCurrencies}
                        balance={balance}
                        rates={rates}
                        setBalance={setBalance}
                        setCurrentCurrency={setCurrentCurrency}
                    />
                );
            case 'CurrencyChart':
                return (
                    <CurrencyChart
                        currencyData={Object.values(mockCurrencyData).flat()}
                        currencyName={currentCurrency}
                    />
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        // Здесь можно добавить имитацию API-запроса для обновления курсов валют
        // Например, с использованием setInterval для регулярного обновления
    }, []);

    return (
        <ThemeProvider theme={theme === 'light' ? LightTheme : DarkTheme}>
            <GlobalStyle />
            <AppContainer>
                <Header toggleTheme={toggleTheme} setActiveComponent={setActiveComponent} />
                {renderActiveComponent()}
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;