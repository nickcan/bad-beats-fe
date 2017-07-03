import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import * as AuthenticationFormActions from "../actions/authentication-form-actions";

import logo from "../static-assets/boxing_logo_big.png";

import ENV_CONFIG from "../api-fetchers/env-config";

const Container = styled.div`
  display: flex;
  justify-content: center;

  padding-bottom: 25px;
  width: 100%;

  font-family: ${(props) => props.theme.mainFont};
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 50px;
  width: 600px;

  @media (max-width: 600) {
    width: 100%;
  }
`;

const AppName = styled.div`
  font-size: 32px;
  margin-bottom: 32px;
`;

const Logo = styled.div`
  height: 100px;
  width: 100px;
  margin-bottom: 35px;

  background: url(${logo}) no-repeat center center;
  background-size: 100% 100%;
`;

const FacebookLoginLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 85%;
  margin-bottom: 12px;

  background-color: ${(props) => props.theme.blue};
  border-radius: 3px;

  color: white;
  cursor: pointer;
  font-size: 18px;
  text-decoration: none;
`;

const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;

  width: 85%;
`;

const SubmitButton = styled.button`
  padding: 12px 46px;
  margin-top: 18px;

  background-color: ${(props) => props.theme.safetyOrange};
  border: none;
  border-radius: 3px;

  color: ${(props) => props.theme.white};
  font-size: 18px;
  font-weight: 400;

  cursor: pointer;
`;

const SwitchFormText = styled.div`
  margin-top: 6px;
`;

const SwitchFormLink = styled(Link)`
  color: ${(props) => props.theme.blue};
  cursor: pointer;
  text-decoration: none;
`;

const InputFieldContainer = styled.div`
  width: 100%;
`;

const StyledInput = styled.input`
  box-sizing: border-box;

  margin-bottom: 8px;
  padding: 8px 10px;
  width: 100%;

  border: 1px solid ${(props) => props.hasError ? props.theme.safetyOrange : props.theme.gainsboro};
  border-radius: 3px;
  outline: none;

  transition: border, .25s;

  &:focus {
    box-shadow: inset 0 0 1px 0 ${(props) => props.hasError ? props.theme.safetyOrange : props.theme.davysGray};
  }
`;

const StyledLabel = styled.div`
  align-self: flex-start;
  opacity: ${(props) => props.hasError ? 1 : 0};

  height: 14px;
  margin: 0 0 4px 1px;

  color: ${(props) => props.theme.safetyOrange};
  font-size: 14px;

  transition: opacity, .25s;
`;

const InputField = function({
  ...props
}) {
  return (
    <InputFieldContainer>
      <StyledLabel hasError={props.error}>{props.error}</StyledLabel>
      <StyledInput
        {...props}
        hasError={props.error}
      />
    </InputFieldContainer>
  );
}

const LoginForm = ({
  ...props
}) => (
  <StyledForm onSubmit={(event) => props.submitForm(event)}>
    <InputField
      error={props.errors.invalid}
      placeholder="Email"
      type="email"
      value={props.email}
      onChange={(event) => props.updateAuthenticationForm({
        field: "email",
        value: event.target.value
      })}
    />
    <InputField
      error={props.errors.password}
      placeholder="Password"
      type="password"
      value={props.password}
      onChange={(event) => props.updateAuthenticationForm({
        field: "password",
        value: event.target.value
      })}
    />
    <SwitchFormText>
      Don't have an account? <SwitchFormLink to={"/signup"}>Sign up</SwitchFormLink>
    </SwitchFormText>
    <SubmitButton>Submit</SubmitButton>
  </StyledForm>
);

const SignupForm = ({
  ...props
}) => (
  <StyledForm onSubmit={(event) => props.submitForm(event)}>
    <InputField
      error={props.errors.name}
      placeholder="Full Name"
      value={props.name}
      onChange={(event) => props.updateAuthenticationForm({
        field: "name",
        value: event.target.value
      })}
    />
    <InputField
      error={props.errors.email}
      placeholder="Email"
      type="email"
      value={props.email}
      onChange={(event) => props.updateAuthenticationForm({
        field: "email",
        value: event.target.value
      })}
    />
    <InputField
      error={props.errors.password}
      placeholder="Password"
      type="password"
      value={props.password}
      onChange={(event) => props.updateAuthenticationForm({
        field: "password",
        value: event.target.value
      })}
    />
    <InputField
      error={props.errors.passwordConfirmation}
      placeholder="Password Confirmation"
      type="password"
      value={props.passwordConfirmation}
      onChange={(event) => props.updateAuthenticationForm({
        field: "passwordConfirmation",
        value: event.target.value
      })}
    />
    <SwitchFormText>
      Already have an account? <SwitchFormLink to={"/login"}>Login</SwitchFormLink>
    </SwitchFormText>
    <SubmitButton>Submit</SubmitButton>
  </StyledForm>
);

class AuthenticationForm extends React.Component {
  determineForm() {
    return this.props.location.pathname === "/login" ? LoginForm : SignupForm;
  }

  render() {
    const CurrentForm = this.determineForm();

    return (
      <Container>
        <SubContainer>
          <AppName>Fantasy Bad Beats</AppName>
          <Logo />
          <FacebookLoginLink href={`${ENV_CONFIG.apiDomain}/auth/facebook`} alt="facebook signin">Log in with Facebook</FacebookLoginLink>
          <CurrentForm {...this.props} />
        </SubContainer>
      </Container>
    );
  }
}

const mapDispatchToProps = function(dispatch, props) {
  return {
    ...bindActionCreators(AuthenticationFormActions, dispatch),
    submitForm: async function(event) {
      event.preventDefault();
      if (props.location.pathname === "/signup") {
        dispatch(AuthenticationFormActions.signup());
      } else {
        dispatch(AuthenticationFormActions.login());
      }
    }
  };
};

const mapStateToProps = function(state) {
  return {
    ...state.authenticationForm
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthenticationForm);
