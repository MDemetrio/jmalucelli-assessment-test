import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from   { opacity: 0; }
  to { opacity: 1; }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Button = styled.button`
  animation: ${fadeIn} 1s linear normal;
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
    animation: ${props => props.disabled && rotate360} 2s linear infinite;
    content: url(${props => props.icon}); width: 2.5em;
  }

  @media (min-width: 600px) {
    width: 400px;
    position: relative;
    bottom: 0;
    top: 50px;
  }
`;

export default Button;