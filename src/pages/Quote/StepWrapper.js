import React from 'react';
import styled from "styled-components";


const StepContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
  color: black;
  font-size: calc(8px + 2vmin);
  font-weight: bold;
`;

const Step = styled.div`
  height: 0;
  width: 22px;
  font-size: 1rem;
  padding-bottom: 20px;
  border: 2px solid #8e84ee;
  text-align: center;
  color: #8e84ee;
  margin-right: 20px;
`;

const StepWrapper = (props) => (
    <StepContainer>
        <Step>1</Step>
        Buscar por CNPJ ou empresa
    </StepContainer>
)


export default StepWrapper;