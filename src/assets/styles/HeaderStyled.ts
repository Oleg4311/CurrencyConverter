import styled from "styled-components";

interface StyledHeaderProps {
  isLight: boolean;
}

export const StyledHeader = styled.div<StyledHeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #262626;
  color: #fff;

  button {
    width: 60px;
    height: 30px;
    border-radius: 15px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.isLight ? "flex-start" : "flex-end")};
    background: ${(props) => (props.isLight ? "#007BFF" : "#FFD700")};
    cursor: pointer;
    position: relative;
    transition: justify-content 0.3s;
    margin: 0 5px;

    &:focus {
      outline: none;
    }

    &::before {
      content: "";
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background-color: white;
      position: absolute;
      top: 1px;
      transition: left 0.3s;
      left: ${(props) => (props.isLight ? "1px" : "31px")};
    }
  }

  a {
    color: #fff; // Default white color
    opacity: 0.6; // Default opacity
    transition: opacity 0.3s; // Smooth transition for opacity
    text-decoration: none; // Removing default underline
    margin: 0 5px; // Spacing between links

    &:hover {
      opacity: 1; // Full opacity on hover
    }
  }

  .active-link {
    opacity: 1; // Full opacity for active link
  }
`;
