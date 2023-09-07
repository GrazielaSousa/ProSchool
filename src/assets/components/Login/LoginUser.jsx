import { InputField } from '../Forms/InputForm/InputField.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.jsx';
import { PropTypes } from 'prop-types';
import '../../styles/login.scss';

export const LoginUser = ({ onForgotPasswordClick }) => {
  const navigate = useNavigate();
  const [credentialCorrect, setCredential] = useState(false);

  InputField.defaultProps = {
    title: '',
  };

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [id]: value,
    }));
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (!value) {
      setLoginData((prevLoginData) => ({
        ...prevLoginData,
        [id]: '',
      }));
    }
  };

  const handleAcessarClick = () => {
    // Verificar as credenciais do usuário
    if (loginData.email === '123' && loginData.password === '123') {
      console.log('Credenciais válidas');
      setCredential(true);
      navigate('/home'); // Redirecionar para a página inicial após o login
    } else {
      console.error('Credenciais inválidas');
    }
  };

  return (
    <>
      <InputField
        title="Realizar Login"
        type="text"
        id="email"
        className="form_input"
        autoComplete="off"
        name="email"
        placeholder={loginData.email ? '' : 'Email'}
        value={loginData.email}
        onBlur={handleBlur}
        onChange={handleInputChange}
        label="Email"
      />
      <InputField
        title=""
        type="password"
        name="password"
        id="password"
        className="form_input"
        autoComplete="off"
        placeholder={loginData.password ? '' : 'Senha'}
        value={loginData.password}
        onBlur={handleBlur}
        onChange={handleInputChange}
        label="Senha"
        data-credential-correct={credentialCorrect}
      />
      <div className="save-password">
        <div className="container-senha">
          <input type="checkbox" className="btn-checkbox" id="checkbox" />
          <label htmlFor="checkbox" className="label-checkbox">
            Lembrar-me
          </label>
        </div>
        {onForgotPasswordClick &&
          typeof onForgotPasswordClick === 'function' && (
            <span className="reset-password" onClick={onForgotPasswordClick}>
              Esqueceu sua senha?
            </span>
          )}
      </div>
      <Button textButton="Acessar" onClick={handleAcessarClick} />
    </>
  );
};

LoginUser.propTypes = {
  onForgotPasswordClick: PropTypes.func,
  dateLogin: PropTypes.string,
  onBackToLoginClick: PropTypes.func,
  onCredentialCorrectChange: PropTypes.func,
};
