import styled from 'styled-components';

export const StyledCurrencyList = styled.table`
    width: 100%;
    border-collapse: collapse;
    font-size: 16px;
    text-align: center;
`;

export const StyledHeader = styled.thead`
    background-color: ${props => props.theme.bgColor};

    & > tr > th {
        font-weight: bold;
        padding: 12px;
        border-bottom: 2px solid #e0e0e0;
    }

    & > tr > th:nth-child(1) {
        width: 50%; // Примерно половина ширины
    }

    & > tr > th:nth-child(2) {
        width: 20%; // Обозначение валюты
    }

    & > tr > th:nth-child(3) {
        width: 30%; // Курс
    }
`;

export const StyledCurrencyItem = styled.tr`
    &:hover {
        background-color: #fafafa;
    }

    & > td {
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
    }

    &:last-child > td {
        border-bottom: none;
    }

    & > td:nth-child(1) {
        width: 50%; // Примерно половина ширины
    }

    & > td:nth-child(2) {
        width: 20%; // Обозначение валюты
    }

    & > td:nth-child(3) {
        width: 30%; // Курс
    }
`;

export const StyledPagination = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0;
`;
