import Menu from '../assets/components/Menu/Menu.jsx';
import MainSection from '../assets/components/Main/Main.jsx';
import Header from '../assets/components/Header/Header.jsx';
import '../assets/styles/home.scss';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

function Home({ tipoUsuario }) {
  const defaultMenuItem = getDefaultItemMenu(tipoUsuario);

  const [selectedMenuItem, setSelectedMenuItem] = useState(defaultMenuItem);

  useEffect(() => {
    setSelectedMenuItem(defaultMenuItem);
  }, [tipoUsuario]);

  // Função para obter o item de menu padrão com base no tipo de usuário
  function getDefaultItemMenu(tipoUsuario) {
    switch (tipoUsuario) {
      case 'aluno':
        return 'Materiais'; // Defina o item de menu padrão para alunos
      case 'professor':
        return 'Dashboard'; // Defina o item de menu padrão para professores
      case 'responsavel':
        return 'Dados do Aluno'; // Defina o item de menu padrão para responsáveis
      case 'admin':
        return 'Dashboard'; // Defina o item de menu padrão para administradores
      default:
        return ''; // Valor padrão para outros tipos de usuário
    }
  }

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
    // console.log("MenuItem:", menuItem);
  };
  return (
    <div className="home">
      <Menu onMenuItemClick={handleMenuItemClick} tipoUsuario={tipoUsuario} />
      <div className="container-main">
        <Header selectedMenuItem={selectedMenuItem} />
        <MainSection selectedMenuItem={selectedMenuItem} />
      </div>
    </div>
  );
}

Home.propTypes = {
  nomeUsuario: PropTypes.string,
  tipoUsuario: PropTypes.string,
};

export default Home;
