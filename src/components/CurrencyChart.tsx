import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LineController, PointElement, LineElement, LinearScale } from 'chart.js';
import { StyledCurrencyChart, ChartHeader, ChartSelect, getDatasetStyles } from '../assets/styles/CurrencyChartStyled';

// Регистрация всех необходимых модулей
Chart.register(CategoryScale, LineController, PointElement, LineElement, LinearScale);

interface CurrencyData {
    date: string;
    rate: number;
    name: string;
}

interface Props {
    currencyData: CurrencyData[]; // Изменили тип здесь
    currencyName: string;
}

const CurrencyChart: React.FC<Props> = ({ currencyData, currencyName: initialCurrencyName }) => {
    const [period, setPeriod] = useState<number>(7);
    const [selectedCurrency, setSelectedCurrency] = useState<string>(initialCurrencyName);

    const filteredData = currencyData
        .filter(item => item.name === selectedCurrency)
        .slice(-period);

    const data = {
        labels: filteredData.map(item => item.date),
        datasets: [
            {
                ...getDatasetStyles(selectedCurrency),
                data: filteredData.map(item => item.rate)
            }
        ],
    };

    return (
        <StyledCurrencyChart>
            <ChartHeader>{selectedCurrency} Exchange Rate</ChartHeader>

            {/* Dropdown to select currency */}
            <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                {Array.from(new Set(currencyData.map(item => item.name))).map(name => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>

            <ChartSelect value={period} onChange={(e) => setPeriod(Number(e.target.value))}>
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
                <option value={365}>Last 365 days</option>
            </ChartSelect>

            <Line data={data} />
        </StyledCurrencyChart>
    );
}


export default CurrencyChart;