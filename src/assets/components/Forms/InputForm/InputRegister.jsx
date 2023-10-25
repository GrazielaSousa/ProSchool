import PropTypes from 'prop-types';
// import '../form_login.scss';

export const InputRegister = ({
  type,
  id,
  placeholder,
  label,
  value,
  name,
  onBlur,
  onChange,
}) => {
  return (
    <>
      <div className="c-register">
        <input
          type={type}
          id={id}
          name={name}
          className="_input-register"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <label htmlFor={id} className="_label">
          {label}
        </label>
      </div>
    </>
  );
};

InputRegister.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  title: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
};
