import styled from "styled-components";
import arrowFoward from '../assets/arrow-foward.svg';

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 85vw;
  font-family: "Open Sans";
  font-weight: bold;
  font-size: 1rem;
  color: #8e84ee;
  background-color: white;
  text-decoration:none;
  border: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: absolute;
  bottom: 5%;
  :active{
    transform: scale(0.98);
  }
  :focus{
    outline:0;
  }
  ::after{
    content: url(${arrowFoward}); width: 2.5em;
  }

  @media (min-width: 600px) {
    width: 400px;
    position: relative;
    bottom: 0;
    top: 50px;
  }
`;

export default Button;