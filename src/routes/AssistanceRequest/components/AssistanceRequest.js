import React from 'react';
import PropTypes from 'prop-types';
import { Field, SubmissionError } from 'redux-form';
import isEqual from 'lodash/isEqual';
import RenderField from '../../../components/RenderField';
import RenderTextArea from '../../../components/RenderTextArea';
import { mapFormDataToRequest } from '../modules/assistanceRequest';
import './AssistanceRequest.scss';

class AssistanceRequest extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchServiceTypes } = this.props;
    fetchServiceTypes();
  }

  handleSubmit(data) {
    const { postAssistanceRequest, reset, submissionData } = this.props;
    const mappedData = mapFormDataToRequest(data);

    if (submissionData
      && submissionData.echo
      && isEqual(mappedData, submissionData.echo)) {
      throw new SubmissionError(
        {
          _error: 'You have already submitted this information'
        }
      );
    }

    postAssistanceRequest(mappedData);
    reset('assistanceRequestForm');
  }

  renderError = (message) => {
    return (<p role="alert" className="alert alert-danger">{message}</p>);
  }

  renderSuccess = (data) => {
    return (
      <div className="alert alert-success" role="alert">
        <h6 className="alert-heading">{data.message}</h6>

        <div className="mb-0">
          <ul className="submit-success__list">
            <li>First Name: {data.echo.assistance_request.contact.first_name}</li>
            <li>Last Name: {data.echo.assistance_request.contact.last_name}</li>
            <li>Email: {data.echo.assistance_request.contact.email}</li>
            <li>Service Type: {data.echo.assistance_request.service_type}</li>
            <li>Description: {data.echo.assistance_request.description}</li>
          </ul>
        </div>
      </div>
    );
  }

  render() {
    const {
      error,
      handleSubmit,
      hasSubmissionError,
      isSubmitting,
      invalid,
      submissionError,
      submissionData,
      pristine,
      serviceTypes,
    } = this.props;

    const isDisabled = isSubmitting || invalid;

    return (
      <div>
        <h3 className="header">New Assistance Request</h3>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="form-group assistance-firstname">
            <label
              htmlFor="firstName"
              className="sr-only">
              First Name
            </label>
            <Field
              name="firstName"
              type="text"
              component={RenderField}
              label="First Name"
              placeholder="First Name (Required)"
            />
          </div>

          <div className="form-group assistance-lastname">
            <label
              htmlFor="lastName"
              className="sr-only">
              Last Name
            </label>
            <Field
              name="lastName"
              type="text"
              component={RenderField}
              label="Last Name"
              placeholder="Last Name (Required)"
            />
          </div>

          <div className="form-group assistance-email">
            <label
              htmlFor="email"
              className="sr-only">
              Email
            </label>
            <Field
              name="email"
              type="email"
              component={RenderField}
              label="Email"
              placeholder="Email (Required)"
            />
          </div>

          <div className="form-group assistance-select">
            <label
              htmlFor="serviceType"
              className="sr-only">
              Service Type
            </label>
            <Field name="serviceType"
              component="select"
              className="form-control">
              <option
                value=""
                className="select-default"
                disabled>
                Select Service Type (Required)
              </option>
              {serviceTypes.length && serviceTypes.map(serviceType => (
                <option value={serviceType.id} key={serviceType.id}>
                  {serviceType.displayName}
                </option>
            ))}
            </Field>
          </div>

          <div className="form-group assistance-description">
            <label
              htmlFor="serviceType"
              className="sr-only">
              Request Description
            </label>
            <Field
              name="description"
              placeholder="Description"
              component={RenderTextArea} />
          </div>

          <div className="form-group d-flex flex-row">
            <Field
              id="acceptTerms"
              name="acceptTerms"
              className="accept-terms-checkbox"
              component="input"
              type="checkbox" />
            <label htmlFor="acceptTerms" className="accept-terms-text">
              I hereby accept the terms of service for the NETWORK and the privacy policy.
            </label>
          </div>

          <button
            disabled={isDisabled}
            type="submit"
            className="btn btn-primary submit-button">
            Get Assistance
          </button>

          <div className="messages">
            { // field-level
              hasSubmissionError
              && pristine
              && this.renderError(submissionError.message)
            }
            { // form-level
              error
              && this.renderError(error)
            }
            {
              !hasSubmissionError
              && !error
              && submissionData
              && submissionData.echo
              && this.renderSuccess(submissionData) }
          </div>
        </form>
      </div>
    );
  }
};

AssistanceRequest.propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  hasSubmissionError: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  postAssistanceRequest: PropTypes.func,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func,
  serviceTypes: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  submissionData: PropTypes.shape({
    echo: PropTypes.shape({
      assistanceRequest: PropTypes.shape({
        contact: PropTypes.shape({
          email: PropTypes.string,
          first_name: PropTypes.string,
          last_name: PropTypes.string,
        }),
        description: PropTypes.string,
        serviceType: PropTypes.string,
      }),
    }),
  }),
  submissionError: PropTypes.shape({
    message: PropTypes.string,
  }),
  fetchServiceTypes: PropTypes.func,
};

AssistanceRequest.defaultProps = {
  hasSubmissionError: false,
  isSubmitting: false,
  pristine: true,
};

export default AssistanceRequest;
