import { LoginUser } from '../assets/components/Login/LoginUser.jsx';
import '../assets/styles/login.scss';
/** Imagens */
import ImgLogin from '../assets/images/img-login.svg';
import Logo from '../assets/images/logo-tcc.svg';

export const Login = () => {
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
          <LoginUser />
        </div>
      </div>
    </div>
  );
};
