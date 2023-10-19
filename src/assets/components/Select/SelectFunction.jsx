import './select.scss';
import PropTypes from 'prop-types';

export const SelectFunction = ({
  id,
  value,
  options,
  label,
  text,
}) => {

  return (
    <>
      <label htmlFor="form_select" className="label-register">
        {text}
        <span className="material-icons-sharp emergency">emergency</span>
      </label>
      <select
        id={id}
        value={value}
        className="input-register"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};

SelectFunction.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
