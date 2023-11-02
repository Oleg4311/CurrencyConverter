import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchDataThunk,
    selectCurrencies,
    selectLatestRates,
    selectStatus,
    selectBase,
    selectCurrentPage,
    setCurrentPage
} from '../redux/exchangeSlice';
import { AppDispatch } from '../redux/store';
import { StyledCurrencyList, StyledCurrencyItem, StyledHeader } from '../assets/styles/CurrencyListStyled';
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
    const base = useSelector(selectBase);
    const currentPage = useSelector(selectCurrentPage);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(fetchDataThunk({ type: 'latestRates', params: { page: currentPage }}));
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (!currencies) {
            dispatch(fetchDataThunk({ type: 'currencies' }));
        }
    }, [dispatch, currencies]);

    if (status === 'loading' && !latestRates) {
        return <div>Загрузка...</div>;
    }

    if (status === 'failed') {
        return <div>Ошибка загрузки валют</div>;
    }

    if (!latestRates || Object.keys(latestRates).length === 0) {
        return <div>Нет доступных данных о валютах</div>;
    }

    const currenciesToShow = Object.entries(latestRates)
        .map(([name, rate]) => ({ name, rate }));

    const totalCurrencies = Object.keys(currencies || {}).length - 1; // учитываем исключение базовой валюты
    const totalPages = Math.ceil(totalCurrencies / itemsPerPage);
    return (
        <div>
            <StyledCurrencyList>
                <StyledHeader>
                    <tr>
                        <th>Наименование валюты</th>
                        <th>Обозначение</th>
                        <th>Курс по отношению к {base}</th>
                    </tr>
                </StyledHeader>
                <tbody>
                {currenciesToShow.map(({ name, rate }) => (
                    <StyledCurrencyItem key={name}>
                        <td>{currencies ? currencies[name] : 'N/A'}</td>
                        <td>{name}</td>
                        <td>{rate ? rate.toString() : 'N/A'}</td>
                    </StyledCurrencyItem>
                ))}
                </tbody>
            </StyledCurrencyList>
            <Pagination
                pages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => dispatch(setCurrentPage(page))}
            />
        </div>
    );
};

export default CurrencyList;
