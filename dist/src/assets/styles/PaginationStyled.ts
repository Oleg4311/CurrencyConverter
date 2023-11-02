import styled from 'styled-components';

export const StyledPagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
        margin: 0 5px;
        padding: 5px 10px;
        background-color: transparent;
        border: 1px solid ${(props) => props.theme.color};
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: ${(props) => props.theme.color};
            color: ${(props) => props.theme.background};
        }
    }
`;