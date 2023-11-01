import React, { useState, useEffect } from 'react';
import { StyledCurrencyList, StyledCurrencyItem } from '../assets/styles/CurrencyListStyled';
import Pagination from './Pagination';

interface CurrencyProps {
    name: string;
    rate: number;
}

const CurrencyList: React.FC = () => {
    const [currencies, setCurrencies] = useState<CurrencyProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Здесь будет запрос к API для получения данных о валютах
        // Пока что будем использовать фиктивные данные для демонстрации
        const dummyData = [
            { name: 'USD', rate: 73.5 + currentPage },
            { name: 'EUR', rate: 86.8 + currentPage },
        ];
        setCurrencies(dummyData);
    }, [currentPage]);

    return (
        <StyledCurrencyList>
            {currencies.map(currency => (
                <StyledCurrencyItem key={currency.name}>
                    <span>{currency.name}</span>
                    <span>{currency.rate}</span>
                </StyledCurrencyItem>
            ))}
            <Pagination pages={5} currentPage={currentPage} onPageChange={setCurrentPage} />
        </StyledCurrencyList>
    );
}

export default CurrencyList;