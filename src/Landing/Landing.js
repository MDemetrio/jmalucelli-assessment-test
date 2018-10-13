import React, { Component } from 'react'
import styled from "styled-components";
import lineChart from '../assets/line-chart.svg';
import { Button } from '../components';
import SineWave from '../components/SineWave';

const Container = styled.main`
  background-image: linear-gradient(#8386f0, #a36cf4);
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16vh;
  color: white;
  text-align: center;
  font-size: calc(8px + 2vmin);
  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

const LineChartIcon = styled.img`
  height: 6vmin;
  margin-bottom: 10%;
`;

const H1 = styled.h1`
  font-weight: bold;
  letter-spacing: 1px;
`;

const H2 = styled.h2`
  font-family: "Open Sans";
  font-size: 1rem;
  opacity: 0.7;
  margin: 0px;
`;

export default class Landing extends Component {
  render() {
    return (
      <Container>
        <SineWave />
        <Content>
          <LineChartIcon src={lineChart} alt="line-chart" />
          <H1>Cotação de seguros</H1>
          <H2>Solução inovadora da líder de mercado</H2>
          <Button>Iniciar</Button>
        </Content>
      </Container>
    )
  }
}
