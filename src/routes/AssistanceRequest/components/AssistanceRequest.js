import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import RenderField from '../../../components/RenderField';
import RenderTextArea from '../../../components/RenderTextArea';

const headerStyle = {
  borderBottom: '1px solid #ebebeb',
  marginBottom: '40px',
  paddingBottom: '20px',
}

class AssistanceRequest extends React.Component {
  componentDidMount() {
    const { fetchServiceTypes, postAssistanceRequest } = this.props;
    fetchServiceTypes();
  }

  render() {
    const {
      handleChange,
      handleSubmit,
      pristine,
      reset,
      serviceTypes,
      submitting,
      postAssistanceRequest,
    } = this.props;

    return (
      <div>
      <h3 style={headerStyle}>New Assistance Request</h3>
      <form onSubmit={handleSubmit(postAssistanceRequest)}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <Field
            name="firstName"
            type="text"
            component={RenderField}
            label="First Name"
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <Field
            name="lastName"
            type="text"
            component={RenderField}
            label="Last Name"
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            type="email"
            component={RenderField}
            label="Email"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="serviceType">Service Type</label>
          <Field name="serviceType"
            component="select"
            className="form-control">
            {serviceTypes.length && serviceTypes.map(serviceType => (
              <option value={serviceType.id} key={serviceType.id}>
                {serviceType.displayName}
              </option>
            ))}
          </Field>
        </div>
        <div className="form-group">
          <label htmlFor="serviceType">Request Text</label>
          <Field
            name="requestTesxt"
            component={RenderTextArea}>
          </Field>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
    );
  }
};

AssistanceRequest.propTypes = {
  serviceTypes: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  fetchServiceTypes: PropTypes.func.isRequired,
};

export default AssistanceRequest;
