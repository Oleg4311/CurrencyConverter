import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${(props: any) => props.theme.background};
        color: ${(props: any) => props.theme.color};
        font-family: Arial, sans-serif;
        transition: all 0.5s ease;
    }
`;

export default GlobalStyle;