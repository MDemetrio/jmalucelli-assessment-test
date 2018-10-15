import React, { Component } from 'react'
import styled from "styled-components";
import { Spring } from 'react-spring';
import NavBar from './NavBar';
import StepWrapper from './StepWrapper';
import { Button } from '../components';
import arrowFowardWhite from '../assets/arrow-foward-white.svg';
import checkCircle from '../assets/check-circle.svg';
import spinner from '../assets/spinner.svg';
import MaskedInput from 'react-text-mask'
import { getQuoteByCnpj } from '../services/quoteService';

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: #f2f6f8;
`;

const Content = styled.section`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  text-align: center;
  font-size: calc(8px + 2vmin);
`;

const InputLabel = styled.label`
  margin-left: 16px;
  margin-top: 8px;
  align-self: flex-start;
  color: #9ca5ac;

`;

const Input = styled.input`
    padding: 16px 0px;
    border: 0;
    font-size: 1.4rem;
    color: #505969;
    :focus{
    outline:0;
  }
`;

const FieldContainer = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6vh 0px;

  @media (min-width: 600px) {
    width: 400px;
  }
`;

const InputContainer = styled.div`
    width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FieldValidityIcon = styled.img`
  height: 18px;
`;

export default class Quote extends Component {

  state = {
    cnpj: '',
    formValid: false,
    isFetching: false
  }

  handleFieldChange = (event) => {
    const value = event.target.value
    const name = event.target.name

    this.setState({ [name]: value, formValid: this.formEl.checkValidity() })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const cnpj = this.state.cnpj.replace(/\D/g, '');

    if (this.formEl.checkValidity() && !this.state.isFetching) {
      this.setState({ isFetching: true }, () => {
        getQuoteByCnpj(cnpj)
          .then(r => r.text())
          .then(t => {
            alert(t);
            this.setState({ isFetching: false })
          })
          .catch(e => console.log(e));
      });
    }
  }

  render() {
    const { cnpj, formValid, isFetching } = this.state;

    return (
      <Spring
        native
        config={{ tension: 120, friction: 60 }}
        from={{
          minHeight: 100,
          opacity: 0
        }}
        to={{
          minHeight: 10,
          opacity: 1
        }}>
        {style =>
          <Container>
            <NavBar style={{ opacity: style.opacity, minHeight: style.minHeight.interpolate(x => `${x}vh`) }} />
            <form ref={form => this.formEl = form} onSubmit={this.handleSubmit}>
              <Content>
                <StepWrapper />
                <FieldContainer>
                  <InputLabel htmlFor="cnpj">CNPJ / Empresa</InputLabel>
                  <InputContainer>
                    <MaskedInput
                      mask={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                      onChange={this.handleFieldChange}
                      value={cnpj}
                      id="cnpj"
                      name="cnpj"
                      required
                      pattern="\d{2}\.\d{3}\.\d{3}/\d{4}-\d{2}"
                      render={(ref, props) => (
                        <Input ref={ref} {...props} />
                      )}
                    />

                    {formValid &&
                      <FieldValidityIcon src={checkCircle} alt="field-is-valid" />
                    }

                  </InputContainer>
                </FieldContainer>
                <Button type='submit' disabled={isFetching} icon={isFetching ? spinner : arrowFowardWhite} style={{ backgroundColor: isFetching ? '#ddd' : '#32cccc', color: 'white' }}>
                  OK
              </Button>
              </Content>
            </form>
          </Container>
        }
      </Spring>
    )
  }
}
