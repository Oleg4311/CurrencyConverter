import axios from 'axios';

const BASE_URL = 'https://api.frankfurter.app';

export const fetchLatestRates = async (from: string = 'EUR') => {
    const response = await axios.get(`${BASE_URL}/latest?from=${from}`);
    return response.data;
};

export const fetchHistoricalRates = async (date: string) => {
    const response = await axios.get(`${BASE_URL}/${date}`);
    return response.data;
};

export const fetchTimeSeriesRates = async (startDate: string, endDate?: string) => {
    const endpoint = endDate ? `${startDate}..${endDate}` : `${startDate}..`;
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
};

export const fetchConversion = async (amount: number, fromCurrency: string, toCurrency: string) => {
    const response = await axios.get(`${BASE_URL}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
    return response.data;
};

export const fetchAvailableCurrencies = async () => {
    const response = await axios.get(`${BASE_URL}/currencies`);
    return response.data;
};