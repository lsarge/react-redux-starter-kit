import React from 'react';
import PropTypes from 'prop-types';

class AssistanceRequest extends React.Component {
  componentDidMount () {
    const { fetchServiceTypes } = this.props;
    console.log(fetchServiceTypes);
    fetchServiceTypes();
  }

  render () {
    const { serviceTypes, increment, doubleAsync } = this.props;
    console.log(serviceTypes);
    return (
      <div style={{ margin: '0 auto' }} >
        <button className='btn btn-primary' onClick={increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-secondary' onClick={doubleAsync}>
          Double (Async)
        </button>
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
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  fetchServiceTypes: PropTypes.func.isRequired,
};

export default AssistanceRequest;
