import { Button } from '../Button/Button.jsx';
import { InputField } from '../Forms/InputForm/InputField.jsx';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const LoginResetPassword = ({ handleBackToLoginClick }) => {
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [id]: value,
    }));
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (!value) {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        [id]: '',
      }));
    }
  };
  const [inputValue, setInputValue] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  InputField.defaultProps = {
    title: '',
  };

  return (
    <>
      <InputField
        title="Resetar senha"
        type="password"
        id="password"
        className="form_input"
        autoComplete="off"
        placeholder={inputValue.password ? '' : 'Senha atual'}
        value={inputValue.password}
        onChange={handleInputChange}
        onBlur={handleBlur}
        label="Senha atual"
      />
      <InputField
        title=""
        type="password"
        id="newPassword"
        className="form_input"
        autoComplete="off"
        placeholder={inputValue.newPassword ? '' : 'Nova senha'}
        value={inputValue.newPassword}
        onChange={handleInputChange}
        onBlur={handleBlur}
        label="Nova senha"
      />
      <InputField
        title=""
        type="password"
        id="confirmPassword"
        className="form_input"
        autoComplete="off"
        placeholder={inputValue.confirmPassword ? '' : 'Confirmar senha'}
        value={inputValue.confirmPassword}
        onChange={handleInputChange}
        onBlur={handleBlur}
        label="Confirmar senha"
      />
      <Button textButton="Alterar senha" onClick={handleBackToLoginClick} />
    </>
  );
};

LoginResetPassword.propTypes = {
  handleBackToLoginClick: PropTypes.func,
};
