import PropTypes from 'prop-types';
import '../form_login.SCSS';

export const InputField = ({
  type,
  id,
  name,
  placeholder,
  label,
  value,
  title,
  onBlur,
  onChange,
}) => {
  return (
    <>
      <p className="titulo-login">{title}</p>
      <form className="form">
        <input
          type={type}
          id={id}
          name={name}
          className="form_input"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label htmlFor={id} className="form_label">
          {label}
        </label>
      </form>
    </>
  );
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  title: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
