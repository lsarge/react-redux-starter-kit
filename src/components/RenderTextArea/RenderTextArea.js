import React from 'react';
import './RenderTextArea.scss';

export const RenderTextArea = (field) => (
  <div>
    <textarea
      {...field.input}
      className="form-control text-area"
      placeholder={field.placeholder}
      rows="5" />
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

export default RenderTextArea;
