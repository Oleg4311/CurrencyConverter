import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import CurrencyList from "./components/CurrencyList";
import WalletOperations from "./components/Wallet";
import CurrencyChart from "./components/CurrencyChart";

import { LightTheme } from "./assets/styles/themes/light-theme";
import { DarkTheme } from "./assets/styles/themes/dark-theme";
import GlobalStyle from "./assets/styles/GlobalStyles";
import AppContainer from "./assets/styles/AppStyled";
import CurrencyConverter from "./components/CurrencyConverter";

type Theme = "light" | "dark";

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
      <GlobalStyle />
      <Router>
        <AppContainer>
          <Header toggleTheme={toggleTheme} isLight={theme === "light"} />
          <Routes>
            <Route path="/currency-list" element={<CurrencyList />} />
            <Route path="/wallet-operations" element={<WalletOperations />} />
            <Route path="/currency-chart" element={<CurrencyChart />} />
            <Route path="/currency-converter" element={<CurrencyConverter />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App;
