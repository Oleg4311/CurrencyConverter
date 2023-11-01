import styled from 'styled-components';

export const ConverterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 1px solid ${(props) => props.theme.color};
    border-radius: 5px;
    margin: 20px 0;

    h2 {
        margin-bottom: 15px;
        font-weight: bold;
    }
`;

export const ConversionControls = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    select, input {
        margin: 5px;
        padding: 8px;
        border: 1px solid ${(props) => props.theme.color};
        border-radius: 5px;
        background-color: ${(props) => props.theme.background};
        color: ${(props) => props.theme.color};
    }
`;

export const StyledConvertButton = styled.button`
    padding: 8px 12px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => props.theme.color};
        color: ${(props) => props.theme.background};
    }
`;

export const StyledSuccessResult = styled.div`
    font-size: 18px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.background};
`;

// export const StyledErrorResult = styled.div`
//     font-size: 18px;
//     margin-top: 10px;
//     padding: 10px;
//     border-radius: 5px;
//     text-align: center;
//     background-color: ${(props) => props.theme.errorColor || '#f00'};
//     color: ${(props) => props.theme.background};
// `;
