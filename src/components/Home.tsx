import React from 'react';
import { HomeContainer } from '../assets/styles/HomeStyled'; // Путь к вашим стилям

interface HomeProps {
  isLight: boolean;
}

const Home: React.FC<HomeProps> = ({ isLight }) => {
    return (
        <HomeContainer isLight={isLight}>
            <h1>Добро пожаловать в приложение Курсы валют!</h1>
            <p>Выберите интересующий вас раздел:</p>
            <ul>
                <li><a href="/currency-list">Список валют</a></li>
                <li><a href="/wallet-operations">Операции с кошельком</a></li>
                <li><a href="/currency-chart">График валют</a></li>
                <li><a href="/currency-converter">Конвертер валют</a></li>
            </ul>
        </HomeContainer>
    );
}

export default Home;
