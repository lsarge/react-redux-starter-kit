import { validateEmail } from '../../../utils';

export const validate = (values, props) => {
  const errors = {};

  if (!values.firstName || !values.firstName.trim()) {
    errors.firstName = 'Required';
  }

  if (!values.lastName || !values.lastName.trim()) {
    errors.lastName = 'Required';
  }

  if (!values.email || !values.email.trim()) {
    errors.email = 'Required';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.serviceType) {
    errors.serviceType = 'Required';
  }

  if (!values.description || !values.description.trim()) {
    errors.description = 'Required';
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = 'Required';
  }

  return errors;
};

export default validate;
