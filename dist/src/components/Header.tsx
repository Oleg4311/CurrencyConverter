import React, { useState } from "react";
import { NavLink, useMatch } from "react-router-dom";
import { StyledHeader } from "../assets/styles/HeaderStyled";

interface HeaderProps {
  toggleTheme: () => void;
  isLight: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, isLight }) => {
  const isCurrencyListActive = useMatch("/currency-list");
  const isWalletOperationsActive = useMatch("/wallet-operations");
  const isCurrencyChartActive = useMatch("/currency-chart");
  const isCurrencyConverterActive = useMatch("/currency-converter");

  return (
    <StyledHeader isLight={isLight}>
      <h1>Курсы валют</h1>
      <button onClick={toggleTheme} />
      <NavLink
        to="/currency-list"
        className={isCurrencyListActive ? "active-link" : ""}
      >
        Список валют
      </NavLink>
      <NavLink
        to="/wallet-operations"
        className={isWalletOperationsActive ? "active-link" : ""}
      >
        Операции с кошельком
      </NavLink>
      <NavLink
        to="/currency-chart"
        className={isCurrencyChartActive ? "active-link" : ""}
      >
        График валют
      </NavLink>
      <NavLink
        to="/currency-converter"
        className={isCurrencyConverterActive ? "active-link" : ""}
      >
        Конвертер валют
      </NavLink>
    </StyledHeader>
  );
};

export default Header;
