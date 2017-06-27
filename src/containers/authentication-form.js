import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";

import * as AuthenticationFormActions from "../actions/authentication-form-actions";

import logo from "../static-assets/boxing_logo_big.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;

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
  margin-bottom: 46px;

  background: url(${logo}) no-repeat center center;
  background-size: 100% 100%;
`;

const InputField = styled.input`
  margin-bottom: 12px;
  padding: 8px 10px;
  width: 100%;

  border: 1px solid ${(props) => props.theme.gainsboro};
  border-radius: 3px;
`;

const StyledForm = styled.form`
  align-items: center;
  display: flex;
  flex-direction: column;

  width: 80%;
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

const LoginForm = ({
  ...props
}) => (
  <StyledForm onSubmit={(event) => props.submitForm(event)}>
    <InputField
      placeholder="Email"
      type="email"
      value={props.email}
      onChange={(event) => props.updateAuthenticationForm({
        field: "email",
        value: event.target.value
      })}
    />
    <InputField
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
      placeholder="Email"
      type="email"
      value={props.email}
      onChange={(event) => props.updateAuthenticationForm({
        field: "email",
        value: event.target.value
      })}
    />
    <InputField
      placeholder="Name"
      value={props.name}
      onChange={(event) => props.updateAuthenticationForm({
        field: "name",
        value: event.target.value
      })}
    />
    <InputField
      placeholder="Username"
      value={props.username}
      onChange={(event) => props.updateAuthenticationForm({
        field: "username",
        value: event.target.value
      })}
    />
    <InputField
      placeholder="Password"
      type="password"
      value={props.password}
      onChange={(event) => props.updateAuthenticationForm({
        field: "password",
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
        await dispatch(AuthenticationFormActions.signup());
        dispatch(AuthenticationFormActions.resetAuthenticationForm());
        props.history.push("/");
      } else {
        await dispatch(AuthenticationFormActions.login());
        dispatch(AuthenticationFormActions.resetAuthenticationForm());
        props.history.push("/");
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
