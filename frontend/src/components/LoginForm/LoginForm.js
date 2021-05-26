import React from "react";
import { connect } from "react-redux";
import {
  Actions as authActions,
  FETCHING_USER_FROM_TOKEN_SUCCESS,
} from "../../redux/auth";
import { useNavigate } from "react-router-dom";
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiFieldPassword,
  EuiSpacer,
} from "@elastic/eui";
import { Link } from "react-router-dom";
import validation from "../../utils/validation";
import styled from "styled-components";

const LoginFormWrapper = styled.div`
  padding: 2rem;
`;

const NeedAccountLink = styled.span`
  font-size: 0.8rem;
`;

function LoginForm({ user, authError, isLoading, isAuthenticated, requestUserLogin }) {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({})
  const [hasSubmitted, setHasSubmitted] = React.useState(false)
  const navigate = useNavigate()

  // if the user is already authenticated, redirect them to the '/profile' page
  React.useEffect(() => {
    if (user?.email && isAuthenticated) {
      navigate("/profile")
    }
  }, [user, navigate, isAuthenticated])

  const validateInput = (label, value) => {
    // grab validation function and run it on input if it exists
    // if it doesn't exist, assume input is valid
    const isValid = validation?.[label] ? validation?.[label]?.(value) : true;
    // set an error if the validation function did NOT return true
    setErrors((errors) => ({ ...errors, [label]: !isValid }));
  };

  const handleInputChange = (label, value) => {
    validateInput(label, value);

    setForm((form) => ({ ...form, [label]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate inputs before submitting
    Object.keys(form).forEach((label) => validateInput(label, form[label]));
    // if any input hasn't been entered in, return early
    if (!Object.values(form).every((value) => Boolean(value))) {
      setErrors((errors) => ({
        ...errors,
        form: `You must fill out all fields.`,
      }));
      return;
    }

    setHasSubmitted(true)
    const action = await requestUserLogin({ email: form.email, password: form.password });
    // reset the password form state if the login attempt is not successful
    if (action?.type !== FETCHING_USER_FROM_TOKEN_SUCCESS) {
      setForm((form) => ({ ...form, password: "" }))
    }
  };

  const getFormErrors = () => {
    const formErrors = []
    if (authError && hasSubmitted) {
      formErrors.push(`Invalid credentials. Please try again.`)
    }
    if (errors.form) {
      formErrors.push(errors.form)
    }
    return formErrors
  }

  return (
    <LoginFormWrapper>
      <EuiForm
        component="form"
        onSubmit={handleSubmit}
        isInvalid={Boolean(getFormErrors().length)}
        error={getFormErrors()}
      >
        <EuiFormRow
          label="Email"
          helpText="Enter the email associated with your account."
          isInvalid={Boolean(errors.email)}
          error={`Please enter a valid email.`}
        >
          <EuiFieldText
            icon="email"
            placeholder="user@gmail.com"
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            aria-label="Enter the email associated with your account"
            isInvalid={Boolean(errors.email)}
          />
        </EuiFormRow>

        <EuiFormRow
          label="Password"
          helpText="Enter your password."
          isInvalid={Boolean(errors.password)}
          error={`Password must be at least 7 characters.`}
        >
          <EuiFieldPassword
            placeholder="••••••••••••"
            value={form.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            type="dual"
            aria-label="Enter your password."
            isInvalid={Boolean(errors.password)}
          />
        </EuiFormRow>
        <EuiSpacer />
        <EuiButton type="submit" fill isLoading={isLoading}>
          Submit
        </EuiButton>
      </EuiForm>

      <EuiSpacer size="xl" />

      <NeedAccountLink>
        Need an account? Sign up <Link to="/registration">here</Link>.
      </NeedAccountLink>
    </LoginFormWrapper>
  );
}

const mapStateToProps = (state) => ({
  authError: state.auth.error,
  isLoading: state.auth.isLoading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
  requestUserLogin: ({ email, password }) =>
    dispatch(authActions.requestUserLogin({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
