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
import CurrencyConverter from "./components/CurrencyConverter";

type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [activeComponent, setActiveComponent] = useState('CurrencyList');
    const [theme, setTheme] = useState<Theme>('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'CurrencyList':
                return <CurrencyList />;
            case 'WalletOperations':
                return <WalletOperations />;
            case 'CurrencyChart':
                return <CurrencyChart />;
            case 'CurrencyConverter':
                return <CurrencyConverter />;
            default:
                return null;
        }
    };

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