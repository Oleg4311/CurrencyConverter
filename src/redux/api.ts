import axios from 'axios';

const BASE_URL = 'https://api.frankfurter.app';

export const fetchLatestRates = async (from: string = 'EUR', page: number = 1, pageSize: number = 10) => {
    const allCurrencies = await fetchAvailableCurrencies();
    const currencyKeys = Object.keys(allCurrencies).filter(currency => currency !== from);

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    if (startIndex >= currencyKeys.length) {
        return {};
    }
    
    const paginatedCurrencies = currencyKeys.slice(startIndex, endIndex);
    const currencyString = paginatedCurrencies.join(',');
    
    const response = await axios.get(`${BASE_URL}/latest?from=${from}&to=${currencyString}`);
    return response.data;
};

export const fetchHistoricalRates = async (date: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/${date}`);
        return response.data;
    } catch (error) {
        const typedError = error as any;
        throw new Error(typedError.response?.data?.error || "Failed to fetch historical rates.");
    }
};

export const fetchTimeSeriesRates = async (startDate: string, endDate?: string) => {
    const endpoint = endDate ? `${startDate}..${endDate}` : `${startDate}..`;
    try {
        const response = await axios.get(`${BASE_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        const typedError = error as any;
        throw new Error(typedError.response?.data?.error || "Failed to fetch time series rates.");
    }
};

export const fetchConversion = async (amount: number, fromCurrency: string, toCurrency: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        return response.data;
    } catch (error) {
        const typedError = error as any;
        throw new Error(typedError.response?.data?.error || "Failed to fetch conversion data.");
    }
};

export const fetchAvailableCurrencies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/currencies`);
        return response.data;
    } catch (error) {
        const typedError = error as any;
        throw new Error(typedError.response?.data?.error || "Failed to fetch available currencies.");
    }
};
