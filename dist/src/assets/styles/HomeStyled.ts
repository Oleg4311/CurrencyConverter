import styled from "styled-components";

interface HomeContainerProps {
  isLight: boolean;
}

export const HomeContainer = styled.div<HomeContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => (props.isLight ? "#f5f5f5" : "#262626")};
  color: ${(props) => (props.isLight ? "#262626" : "#fff")};
  border: 1px solid ${(props) => (props.isLight ? "#262626" : "#fff")};
  border-radius: 5px;
  margin: 20px 0;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 15px;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid ${(props) => (props.isLight ? "#262626" : "#fff")};
    border-radius: 5px;
    background-color: ${(props) => (props.isLight ? "#f5f5f5" : "#262626")};
    color: ${(props) => (props.isLight ? "#262626" : "#fff")};
    margin: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${(props) => (props.isLight ? "#e0e0e0" : "#1a1a1a")};
    }
  }

  ul li {
    margin-bottom: 25px;
  }
`;
