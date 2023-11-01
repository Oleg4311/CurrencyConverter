import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchAvailableCurrencies, fetchLatestRates, fetchHistoricalRates, fetchTimeSeriesRates, fetchConversion } from './api';

interface ExchangeState {
    currencies: Record<string, string> | null;
    latestRates: Record<string, number> | null;
    historicalData: Record<string, number> | null;
    timeSeriesData: Record<string, Record<string, number>> | null;
    conversionResult: Record<string, number> | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

interface FetchParams {
    from?: string;
    date?: string;
    startDate?: string;
    endDate?: string;
    amount?: number;
    fromCurrency?: string;
    toCurrency?: string;
}

interface FetchDataArgs {
    type: 'currencies' | 'latestRates' | 'historicalRates' | 'timeSeriesRates' | 'conversion';
    params?: FetchParams;
}

const initialState: ExchangeState = {
    currencies: null,
    latestRates: null,
    historicalData: null,
    timeSeriesData: null,
    conversionResult: null,
    status: 'idle',
    error: null,
};

export const fetchDataThunk = createAsyncThunk<any, FetchDataArgs>(
    'exchange/fetchData',
    async (args) => {
        switch (args.type) {
            case 'currencies':
                return { type: 'currencies', data: await fetchAvailableCurrencies() };
            case 'latestRates':
                const fromCurrency = args.params?.from || 'EUR';
                return { type: 'latestRates', data: await fetchLatestRates(fromCurrency) };
            case 'historicalRates':
                const date = args.params?.date;
                if (!date) {
                    throw new Error('Date parameter is missing for historical rates.');
                }
                return { type: 'historicalRates', data: await fetchHistoricalRates(date) };
            case 'timeSeriesRates':
                const startDate = args.params?.startDate;
                const endDate = args.params?.endDate;
                if (!startDate) {
                    throw new Error('Start date is required for time series rates.');
                }
                return { type: 'timeSeriesRates', data: await fetchTimeSeriesRates(startDate, endDate) };
            case 'conversion':
                const { amount, fromCurrency: from, toCurrency: to } = args.params || {};
                if (typeof amount !== 'number' || !from || !to) {
                    throw new Error('Amount, fromCurrency, and toCurrency are required for conversion.');
                }
                return { type: 'conversion', data: await fetchConversion(amount, from, to) };
            default:
                throw new Error('Invalid type provided to fetchDataThunk.');
        }
    }
);

const exchangeSlice = createSlice({
    name: 'exchange',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataThunk.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchDataThunk.fulfilled, (state, action: PayloadAction<{ type: string, data: any }>) => {
                state.status = 'succeeded';
                switch (action.payload.type) {
                    case 'currencies':
                        state.currencies = action.payload.data;
                        break;
                    case 'latestRates':
                        state.latestRates = action.payload.data.rates;
                        break;
                    case 'historicalRates':
                        state.historicalData = action.payload.data.rates;
                        break;
                    case 'timeSeriesRates':
                        state.timeSeriesData = action.payload.data.rates;
                        break;
                    case 'conversion':
                        state.conversionResult = action.payload.data.rates;
                        break;
                }
            })
            .addCase(fetchDataThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch data.';
            });
    },
});

export default exchangeSlice.reducer;

// Selectors
export const selectCurrencies = (state: any) => state.exchange.currencies;
export const selectLatestRates = (state: any) => state.exchange.latestRates;
export const selectHistoricalData = (state: any) => state.exchange.historicalData;
export const selectTimeSeriesData = (state: any) => state.exchange.timeSeriesData;
export const selectConversionResult = (state: any) => state.exchange.conversionResult;
export const selectStatus = (state: any) => state.exchange.status;
