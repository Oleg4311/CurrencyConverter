import styled from "styled-components";

export const StyledCurrencyChart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0 20px 0;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.color};

  h2 {
    margin-bottom: 15px;
    font-weight: bold;
  }
`;

export const ChartControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  justify-content: space-between;

  select {
    margin: 5px;
    padding: 8px;
    border: 1px solid ${(props) => props.theme.color};
    border-radius: 5px;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    flex: 1;
  }
`;

export const ChartHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const getDatasetStyles = (currencyName: string) => ({
  label: `Exchange rate for ${currencyName}`,
  fill: false,
  backgroundColor: "rgb(75, 192, 192)",
  borderColor: "rgba(75, 192, 192, 0.2)",
});

export const ChartSelect = styled.select`
  margin: 5px;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.color};
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  flex: 1;
`;
