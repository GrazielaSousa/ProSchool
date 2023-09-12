import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.jsx';
import { PropTypes } from 'prop-types';
import '../../styles/login.scss';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import usersData from '../../auth/usuarios.json';
import { setTipoUsuarioLogado } from '../Menu/sidebar.js';
import { useUser } from '../../../context/UserContext.jsx';

export const LoginUser = ({ onForgotPasswordClick }) => {
  const [authenticationError, setAuthenticationError] = useState(false);
  const { setNomeUsuario } = useUser();

  useEffect(() => {
    document.title = 'Login';
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (dataUser) => {
    console.log(dataUser);
    const user = usersData.find(
      (user) =>
        user.login === dataUser.email && user.senha === dataUser.password
    );

    if (user) {
      const usuarioLogado = user.tipoUsuario;
      setNomeUsuario(user.nomeUsuario);
      // console.log('Credenciais válidas');
      setTipoUsuarioLogado(usuarioLogado);
      navigate('/home'); // Redirecionar para a página inicial após o login
    } else {
      setAuthenticationError(true);
      console.error('Credenciais inválidas');
    }
  };

  return (
    <>
      <p className="titulo-login">Realizar Login</p>
      <div className="form">
        <input
          type="text"
          id="email"
          autoComplete="off"
          {...register('email', {
            required: true,
          })}
          className={`form_input ${errors?.email ? 'input-error' : ''}`}
          placeholder="Email"
          label="Email"
        />
        <label htmlFor="email" className="form_label">
          Email
        </label>
      </div>
      {errors?.email && errors?.email.type === 'required' && (
        <span className="error-message">Preencha seu e-mail</span>
      )}

      <div className="form">
        <input
          type="text"
          id="password"
          autoComplete="off"
          {...register('password', {
            required: true,
          })}
          className={`form_input ${errors?.password ? 'input-error' : ''}`}
          placeholder="Senha"
          label="Senha"
        />
        <label htmlFor="password" className="form_label">
          Senha
        </label>
      </div>
      {errors?.password && errors?.password.type === 'required' && (
        <span className="error-message">Insira sua senha</span>
      )}
      {authenticationError && (
        <span className="error-message">Login e/ou senha inválidos</span>
      )}

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
      <Button textButton="Acessar" onClick={handleSubmit(onSubmit)} />
    </>
  );
};

LoginUser.propTypes = {
  onForgotPasswordClick: PropTypes.func,
  onBackToLoginClick: PropTypes.func,
};
