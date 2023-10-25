import { Button } from '../Button/Button.jsx';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import '../../styles/login.scss';

export const LoginResetPassword = ({ handleBackToLoginClick }) => {
  const [changePasswordSucess, setChangePasswordSucess] = useState(false);
  useEffect(() => {
    document.title = 'Resetar senha';
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); // register: registrar os campos do formulário, handleSubmit: submeter o formulário, formState: estado do formulário, errors: erros do formulário
  const watchPassword = watch('new_password');

  const onSubmit = (data) => {
    console.log(data);
    setTimeout(() => {
      setChangePasswordSucess(true);
      setTimeout(() => {
        handleBackToLoginClick();
      }, 2000);
    }, 2000);
  };
  return (
    <>
      <p className="titulo-login">Resetar senha</p>
      <div className="form">
        <input
          type="text"
          id="senha_atual"
          autoComplete="off"
          placeholder="Senha atual"
          className={`form_input ${errors?.password ? 'input-error' : ''}`}
          {...register('password', {
            required: true,
          })}
        />
        <label htmlFor="password" className="form_label">
          Senha atual
        </label>
      </div>
      {errors?.password && errors?.password.type === 'required' && (
        <span className="error-message">Preencha sua senha atual</span>
      )}

      <div className="form">
        <input
          type="text"
          id="nova_senha"
          placeholder="Nova senha"
          className={`form_input ${errors?.new_password ? 'input-error' : ''}`}
          autoComplete="off"
          {...register('new_password', { required: true }, { minLength: 6 })}
        />
        <label htmlFor="nova_atual" className="form_label">
          Nova senha
        </label>
      </div>
      {errors?.new_password && errors?.new_password.type === 'required' && (
        <span className="error-message">Preencha sua nova senha</span>
      )}
      {errors?.new_password && errors?.new_password.type === 'minLength' && (
        <span className="error-message">
          A nova senha deve conter no mínimo 7 caracteres
        </span>
      )}

      <div className="form">
        <input
          type="text"
          id="confirmar_senha"
          placeholder="Confirmar senha"
          className={`form_input ${errors?.confirmation_password ? 'input-error' : ''}`}
          autoComplete="off"
          {...register('confirmation_password', {
            required: true,
            validate: (value) => value === watchPassword,
          })}
        />
        <label htmlFor="confirmar_senha" className="form_label">
          Confirmar senha
        </label>
      </div>
      {errors?.confirmation_password?.type === 'required' && (
        <span className="error-message">Confirme sua nova senha</span>
      )}
      {errors?.confirmation_password?.type === 'validate' && (
        <span className="error-message">As senhas não coincidem</span>
      )}
      {changePasswordSucess && (
        <span className="sucess-message">Senha alterada com sucesso!</span>
      )}
      <Button textButton="Alterar senha" onClick={handleSubmit(onSubmit)} />
    </>
  );
};

LoginResetPassword.propTypes = {
  handleBackToLoginClick: PropTypes.func,
};
