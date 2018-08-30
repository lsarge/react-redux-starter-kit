import React from 'react';
import { visiblyHiddenStyle } from '../../utils';

const errorStyle = {
  fontSize: '12px',
  color: '#f44242',
  float: 'right',
};

const formGroupStyle = {
  height: '70px',
  marginBottom: '0'
}

const inputStyle = {
  marginTop: '6px',
  marginBottom: '10px',
}

const labelStyle = {
  fontSize: '14px',
};

export const RenderField = (field) => {
  return (
    <div>
      <input
        {...field.input}
        type="text"
        className="form-control"
        style={inputStyle}
        placeholder={field.placeholder}
        />
      {
        field.meta.touched && field.meta.error &&
          <span style={errorStyle}>
            {field.meta.error}
          </span>
        }
    </div>
  );
};

export default RenderField;
