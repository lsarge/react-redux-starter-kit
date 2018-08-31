import React from 'react';
import './RenderField.scss';

export const RenderField = (field) => (
  <div>
    <input
      {...field.input}
      type="text"
      className="form-control"
      placeholder={field.placeholder}
      />
    {
      field.meta.touched
      && field.meta.error
      && (
      <span className="error-text">
        {field.meta.error}
      </span>
        )
      }
  </div>
);

export default RenderField;
