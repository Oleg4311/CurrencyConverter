import React from 'react';
import { StyledHeader } from '../assets/styles/HeaderStyled';

interface HeaderProps {
    toggleTheme: () => void;
    setActiveComponent: (componentName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, setActiveComponent }) => {
    return (
        <StyledHeader>
            <h1>Курсы валют</h1>
            <button onClick={toggleTheme}>Сменить тему</button>
            <button onClick={() => setActiveComponent('CurrencyList')}>Список валют</button>
            <button onClick={() => setActiveComponent('WalletOperations')}>Операции с кошельком</button>
            <button onClick={() => setActiveComponent('CurrencyChart')}>График валют</button>
        </StyledHeader>
    );
}

export default Header;