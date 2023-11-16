import './header.scss';
import userUppercase from '../Header/header.js';
import { PropTypes } from 'prop-types';
import { useUser } from '../../../context/UserContext.jsx';
/* Importação das imagens */
import avatar from '../../images/Avatars.svg';

const Header = ({ selectedMenuItem }) => {
  const { nomeUsuario } = useUser();

  return (
    <div className="header">
      <p className="titulo-janela">{selectedMenuItem}</p>

      <div className="perfil">
        <div className="dados-perfil">
          <span className="nome">{nomeUsuario}</span>
          {/** Passa o Usuario que está logado */}
          <span className="tipoUsuario">{userUppercase()}</span>
        </div>

        <img src={avatar} className="icone-perfil" />
      </div>
    </div>
  );
};

Header.propTypes = {
  selectedMenuItem: PropTypes.string.isRequired,
};

export default Header;
