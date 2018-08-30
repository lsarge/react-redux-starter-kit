import React from 'react';

const textAreaStyle = {
  resize: 'none',
}

export const RenderTextArea = (field) => {
  const style = {
    ...field.style,
    ...textAreaStyle
  }

  return (
    <textarea
      {...field.input}
      style={style}
      className="form-control"
      rows="5">
    </textarea>
  );
};

export default RenderTextArea;
