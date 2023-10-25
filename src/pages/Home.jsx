import Menu from '../assets/components/Menu/Menu.jsx';
import MainSection from '../assets/components/Main/Main.jsx';
import Header from '../assets/components/Header/Header.jsx';
import '../assets/styles/home.scss';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

function Home({ tipoUsuario }) {
  const defaultMenuItem = getDefaultItemMenu(tipoUsuario);

  const [selectedMenuItem, setSelectedMenuItem] = useState(defaultMenuItem);

  useEffect(() => {
    // Adicione um ouvinte de evento para detectar mudanças no tipo de usuário no localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'tipoUsuario') {
        setSelectedMenuItem(getDefaultItemMenu());
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // Remova o ouvinte de evento ao desmontar o componente
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Função para obter o item de menu padrão com base no tipo de usuário
  function getDefaultItemMenu() {
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    switch (tipoUsuario) {
      case 'aluno':
<<<<<<< HEAD
        return 'Materiais'; 
=======
        return 'Dashboard'; // Defina o item de menu padrão para alunos
      case 'professor':
        return 'Dashboard'; // Defina o item de menu padrão para professores
      case 'responsavel':
        return 'Dados do Aluno'; // Defina o item de menu padrão para responsáveis
>>>>>>> parent of 67f6227 (Servidor backend)
      case 'admin':
        return 'Usuários'; 
      default:
        return ''; 
    }
  }

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
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
