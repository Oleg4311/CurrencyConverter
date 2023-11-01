import styled from 'styled-components';

export const StyledCurrencyChart = styled.div`
    width: 100%;
    padding: 20px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
    border-radius: 10px;
`;

export const ChartHeader = styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
`;

export const ChartSelect = styled.select`
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    font-size: 14px;
`;

export const getDatasetStyles = (currencyName: string) => ({
    label: `Exchange rate for ${currencyName}`,
    fill: false,
    backgroundColor: 'rgb(75, 192, 192)',
    borderColor: 'rgba(75, 192, 192, 0.2)',
});