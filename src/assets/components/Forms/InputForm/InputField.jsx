import PropTypes from 'prop-types';
import '../form_login.SCSS';
import { forwardRef } from 'react';

export const InputField = forwardRef(function InputField(
  { type, id, placeholder, label, className, title },
  ref
) {
  return (
    <>
      <p className="titulo-login">{title}</p>
      <form className="form">
        <input
          type={type}
          id={id}
          className={className}
          autoComplete="off"
          placeholder={placeholder}
          ref={ref}
        />
        <label htmlFor={id} className="form_label">
          {label}
        </label>
      </form>
    </>
  );
});

InputField.displayName = 'InputField';

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string.isRequired,
};
