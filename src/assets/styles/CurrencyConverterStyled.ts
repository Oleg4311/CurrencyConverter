import styled from 'styled-components';

export const StyledConvertButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export const StyledConvertedResult = styled.p`
    font-size: 18px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
`;

export const StyledSuccessResult = styled(StyledConvertedResult)`
    background-color: green; /* Цвет фона для успешной конвертации */
    color: white; /* Цвет текста для успешной конвертации */
`;

export const StyledErrorResult = styled(StyledConvertedResult)`
    background-color: red; /* Цвет фона для ошибки в конвертации */
    color: white; /* Цвет текста для ошибки в конвертации */
`;
