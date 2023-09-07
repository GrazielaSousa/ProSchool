import './header.scss';
import userUppercase from '../Header/header.js';
import { useState } from 'react';

/* Importação das imagens */
import iconTykki from '../../images/tykki.jpg';
import { PropTypes } from 'prop-types';

const Header = ({ selectedMenuItem }) => {
  // setNome deve atualizar com base no retorno do valo de banco de dados
  const [nomeUsuario, setNome] = useState('Michele Barbosa');

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
