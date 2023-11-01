import styled from 'styled-components';

export const StyledCurrencyList = styled.div`
    padding: 20px;
    border: 1px solid #e0e0e0;
    margin: 20px 0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const StyledCurrencyItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
        border-bottom: none;
    }
`;

export const StyledPagination = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px 0;
`;