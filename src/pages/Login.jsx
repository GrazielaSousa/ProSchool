import { LoginResetPassword } from '../assets/components/Login/LoginResetPassword.jsx';
import { LoginUser } from '../assets/components/Login/LoginUser.jsx';

import '../assets/styles/login.scss';
import { useState } from 'react';

/** Imagens */
import ImgLogin from '../assets/images/img-login.svg';
import Logo from '../assets/images/logo-tcc.svg';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [showResetAcess, setShowResetAcess] = useState(false);

  const handleResetPassword = () => {
    setShowLogin(false);
    setShowResetAcess(true);
    navigate('/resetar-senha');
  };

  const handleBackToLoginClick = () => {
    /** Volta para tela de login */
    setShowLogin(true);
    setShowResetAcess(false);
    navigate('/login');
  };

  return (
    <div className="flex-login">
      <div className="container-img">
        <img
          title="Imagem de login"
          src={ImgLogin}
          width={900}
          height={900}
          className="icon-login"
        />
      </div>

      <div className="container-login">
        <img src={Logo} width={300} height={60} className="logo-site" />
        <div className="container-dados">
          {/** COMPONENTES */}

          {showLogin && (
            <LoginUser
              onForgotPasswordClick={handleResetPassword}
              onBackToLoginClick={handleBackToLoginClick}
            />
          )}
          {showResetAcess && (
            <LoginResetPassword
              handleBackToLoginClick={handleBackToLoginClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};
