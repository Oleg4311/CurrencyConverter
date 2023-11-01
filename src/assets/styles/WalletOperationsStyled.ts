import styled from 'styled-components';

export const WalletContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid ${(props) => props.theme.color};
    border-radius: 5px;
    margin: 20px 0;

    p {
        margin-bottom: 15px;
        font-weight: bold;
    }

    select, input, button {
        margin: 5px;
        padding: 8px;
        border: 1px solid ${(props) => props.theme.color};
        border-radius: 5px;
        background-color: ${(props) => props.theme.background};
        color: ${(props) => props.theme.color};
    }

    button {
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: ${(props) => props.theme.color};
            color: ${(props) => props.theme.background};
        }
    }
`;

export const BuySellButton = styled.button`
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.theme.color};
        color: ${(props) => props.theme.background};
    }
`;

export const AmountInput = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid ${(props) => props.theme.color};
    border-radius: 5px;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    width: 200px;  // Ширина поля ввода. Вы можете изменить это значение.
`;

export const CurrencySelect = styled.select`
    padding: 8px;
    font-size: 16px;
    border: 1px solid ${(props) => props.theme.color};
    border-radius: 5px;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
`;