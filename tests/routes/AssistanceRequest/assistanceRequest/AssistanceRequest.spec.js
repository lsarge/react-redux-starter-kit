import React from 'react';
import { bindActionCreators, createStore } from 'redux';
import AssistanceRequest from 'routes/AssistanceRequest/components/AssistanceRequest';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reduxForm, reducer as formReducer } from 'redux-form';

const store = createStore(() => ({}));
const Decorated = reduxForm({
  form: 'testForm'
})(AssistanceRequest);

describe('(Component) AssistanceRequest', () => {
  let _props;
  let _wrapper;
  let _renderErrorSpy;
  let _renderSuccessSpy;

  beforeEach(() => {
    _props = {
      handleSubmit: sinon.spy(),
      invalid: true,
      serviceTypes: [],
    };
    _wrapper = shallow(<AssistanceRequest {..._props} />);
    _renderErrorSpy = sinon.spy(_wrapper.instance(), 'renderError');
    _renderSuccessSpy = sinon.spy(_wrapper.instance(), 'renderSuccess');
  });

  describe('Form fields', () => {
    let _input;

    it('it has a field for firstName', () => {
      _input = _wrapper.find('[name="firstName"]');
      expect(_input).to.exist();
    });

    it('it has a field for lastName', () => {
      _input = _wrapper.find('[name="lastName"]');
      expect(_input).to.exist();
    });

    it('it has a field for email', () => {
      _input = _wrapper.find('[name="email"]');
      expect(_input).to.exist();
    });

    it('it has a field for serviceType', () => {
      _input = _wrapper.find('[name="serviceType"]');
      expect(_input).to.exist();
    });

    it('it has a field for description', () => {
      _input = _wrapper.find('[name="description"]');
      expect(_input).to.exist();
    });

    it('it has a field for accepting TOS', () => {
      _input = _wrapper.find('[name="acceptTerms"]');
      expect(_input).to.exist();
    });
  });

  describe('Messages', () => {
    it('does not call renderError', () => {
      expect(_renderErrorSpy.called).to.equal(false);
    });
    it('does not call renderSuccess', () => {
      expect(_renderSuccessSpy.called).to.equal(false);
    });
  });

  describe('form', () => {
    let _form;

    beforeEach(() => {
      _form = _wrapper.find('form').first();
    });

    it('calls props.handleSubmit on submit', () => {
      _form.simulate('submit');
      expect(_props.handleSubmit.called).to.equal(true);
    });
  });

  describe('Submit Button', () => {
    let _button;

    beforeEach(() => {
      _button = _wrapper.find('button').filterWhere(a => a.text() === 'Get Assistance');
    });

    it('exists', () => {
      expect(_button).to.exist();
    });

    it('is is a primary button', () => {
      expect(_button.hasClass('btn btn-primary')).to.be.true();
    });

    it('is is disabled', () => {
      expect(_button.prop('disabled')).to.equal(true);
    });
  });
});

describe('(Component) AssistanceRequest Decorated', () => {
  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {};
    _props = {
      reset: sinon.spy(),
      serviceTypes: [],
      ...bindActionCreators({
        fetchServiceTypes: (_spies.fetchServiceTypes = sinon.spy()),
        postAssistanceRequest: (_spies.postAssistanceRequest = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    };

    _wrapper = mount(
      <Provider store={store}>
        <Decorated {..._props} store={store} />
      </Provider>
    );
  });

  it('Calls props.fetchServiceTypes when clicked', () => {
    _spies.fetchServiceTypes.should.have.been.called();
  });

  describe('from submit', () => {
    let _form;

    it('Calls props.postAssistanceRequest', () => {
      beforeEach(() => {
        _form = _wrapper.find('form').first();
        _form.simulate('submit');
      });

      it('calls props.postAssistanceRequest on submit', () => {
        _spies.postAssistanceRequest.should.have.been.called();
      });

      it('calls props.reset on submit', () => {
        _props.reset.should.have.been.called();
      });
    });
  });
});
