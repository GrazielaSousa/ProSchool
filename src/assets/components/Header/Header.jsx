import './header.scss';
import userUppercase from '../Header/header.js';
import { PropTypes } from 'prop-types';
import { useUser } from '../../../context/UserContext.jsx';
/* Importação das imagens */
import iconTykki from '../../images/tykki.jpg';

const Header = ({ selectedMenuItem }) => {
  const { nomeUsuario } = useUser();

  console.log('Nome do usuário atualizado:', nomeUsuario);
  return (
    <div className="header">
      <p className="titulo-janela">{selectedMenuItem}</p>

      <div className="perfil">
        <div className="dados-perfil">
          <span className="nome">{nomeUsuario}</span>
          {/** Passa o Usuario que está logado */}
          <span className="tipoUsuario">{userUppercase()}</span>
        </div>

        <img src={iconTykki} className="icone-perfil" />
      </div>
    </div>
  );
};

Header.propTypes = {
  selectedMenuItem: PropTypes.string.isRequired,
};

export default Header;
