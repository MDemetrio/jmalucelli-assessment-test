import React from 'react'
import styled from "styled-components";
import { animated } from 'react-spring'
import lineChart from '../assets/line-chart.svg';

const Header = styled(animated.header)`
  background-image: linear-gradient(to left, #8386f0, #a36cf4);
  height: 14vh;
  padding: 0px 10vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 600px) {
    padding: 0px 30vw;
    height: 10vh;
  }
`;

const InfoContainer = styled(animated.div)`
  display: flex;
  align-items: center;
`;

const LineChartIcon = styled.img`
  height: 5vmin;
`;

const TitleContainer = styled(animated.div)`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-family: 'Montserrat';
  font-weight: normal;
`

const Title = styled.p`
  font-size: calc(6px + 2vmin);
  margin: 0px;
`
const Avatar = styled(animated.img)`
  height: calc(24px + 4vmin);
  width: calc(24px + 4vmin);
  vertical-align: middle;
  border-radius: 50%;
`;

const NavBar = ({ style }) =>
  (
    <Header style={style}>
      <InfoContainer>
        <LineChartIcon src={lineChart} alt="line-chart-icon" aria-hidden={true} />
        <TitleContainer style={{ opacity: style.opacity }}>
          <Title>Nova cotação</Title>
          <Title>#0980</Title>
        </TitleContainer>
      </InfoContainer>
      <Avatar style={{ opacity: style.opacity }} src="https://source.unsplash.com/collection/1972462" alt="user-avatar" />
    </Header>

  )
export default NavBar;