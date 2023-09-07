import './select.scss';
import PropTypes from 'prop-types';

export const SelectFunction = ({ id, onChange, value }) => {
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="form">
      <select
        id={id}
        value={value}
        className={`form_select ${value ? 'active' : ''}`}
        onChange={handleSelectChange}
      >
        <option value="" disabled hidden></option>
        <option value="Aluno">Aluno</option>
        <option value="Professor">Professor</option>
      </select>
      <label
        htmlFor="form_select"
        className={`form_label ${value ? 'active' : ''}`}
      >
        Selecione uma função
      </label>
    </div>
  );
};

SelectFunction.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};
