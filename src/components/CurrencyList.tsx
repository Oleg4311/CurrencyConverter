import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDataThunk,
    selectCurrencies,
    selectLatestRates,
    selectStatus,
} from '../redux/exchangeSlice';
import { AppDispatch } from '../redux/store';
import { StyledCurrencyList, StyledCurrencyItem } from '../assets/styles/CurrencyListStyled';
import Pagination from './Pagination';

interface CurrencyProps {
    name: string;
    rate: number;
}

const CurrencyList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currencies = useSelector(selectCurrencies);
    const latestRates = useSelector(selectLatestRates);
    const status = useSelector(selectStatus);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        // Диспатчим экшн для получения списка валют только если данные еще не загружены
        if (!latestRates) {
            dispatch(fetchDataThunk({ type: 'latestRates' }));
        }
    }, [dispatch, latestRates]);

    // Проверяем, были ли загружены валюты
    if (status === 'loading' && !latestRates) {
        return <div>Загрузка...</div>;
    }

    if (status === 'failed') {
        return <div>Ошибка загрузки валют</div>;
    }

    // Типизируем latestRates
    type LatestRates = {
        [key: string]: number;
    };

    // Проверка, что latestRates не равен undefined или null, и также не пустой объект
    if (!latestRates || Object.keys(latestRates).length === 0) {
        return <div>Нет доступных данных о валютах</div>;
    }

    // Используем latestRates для отображения курсов валют
    const latestRatesTyped: LatestRates = latestRates;

    // Вычисляем начальный и конечный индексы для текущей страницы
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Фильтруем валюты для текущей страницы
    const currenciesToShow = Object.entries(latestRatesTyped)
        .slice(startIndex, endIndex)
        .map(([name, rate]) => ({ name, rate }));

    return (
        <StyledCurrencyList>
            {currenciesToShow.map(({ name, rate }) => (
                <StyledCurrencyItem key={name}>
                    <span>{name}</span>
                    <span>{rate}</span>
                </StyledCurrencyItem>
            ))}
            <Pagination
                pages={Math.ceil(Object.keys(latestRatesTyped).length / itemsPerPage)}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </StyledCurrencyList>
    );
};

export default CurrencyList;
