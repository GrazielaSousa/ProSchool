import iconeSite from '../../images/logo-tcc.svg';
import './menu.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { tipoUsuario, menuTipoUsuario } from './sidebar.js';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onMenuItemClick }) => {
  const navigate = useNavigate();
  // Função para alterar o nome do item menu que clicou
  const alterarTituloPagina = (event, menuItem) => {
    event.preventDefault();
    onMenuItemClick(menuItem);
  };

  /* ===== TRATA A EXPANSAO DO MENU */
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null); //

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Função ao receber eventos de clique na sidebar
  const manipularCliqueSidebar = (event, menuItem) => {
    event.preventDefault();
    onMenuItemClick(event, menuItem, activeLink);

    // Adicione a classe "active" ao elemento clicado
    event.currentTarget.classList.add('active');
    setActiveLink(menuItem);

    // Feche o menu apenas no mobile (quando a tela é menor ou igual a 768px)
    if (window.innerWidth <= 768) {
      setMenuOpen(false);
    }

    // Limpe o status "ativo" após 3 segundos (3000 ms)
    setTimeout(() => {
      // Verifica se event.currentTarget ainda é válido antes de remover a classe "active"
      if (event.currentTarget) {
        event.currentTarget.classList.remove('active');
        setActiveLink(null);
      }
    }, 3000);

    // Remova a classe "active" de todos os elementos <a>
    const listClassActive = document.querySelectorAll('.sidebar a');
    listClassActive.forEach((element) => {
      element.classList.remove('active');
    });
    // Adicione a classe "active" ao elemento clicado
    event.currentTarget.classList.add('active');
  };

  // Função para verificar o tamanho da tela e atualizar o estado do menuOpen
  const checkWindowSize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(true); // Expande o menu quando a tela for maior que 768px
      // Inserido para o menu não expandir automaticamente
    } else {
      setMenuOpen(false);
    }
  };

  // Efeito de observação do tamanho da tela
  useEffect(() => {
    checkWindowSize(); // Verifica o tamanho da tela ao montar o componente
    window.addEventListener('resize', checkWindowSize); // Adiciona um ouvinte de evento para o redimensionamento da janela
    return () => {
      window.removeEventListener('resize', checkWindowSize); // Remove o ouvinte de evento ao desmontar o componente
    };
  }, []);

  return (
    <div className="container-sidebar">
      {/* Logo do SITE */}
      <aside style={{ display: menuOpen ? 'block' : 'none' }}>
        <div className="top">
          <div className="logo">
            <img src={iconeSite} alt="ProSchool ícone" />
          </div>
          {/* Botão de FECHAR */}
          <div className="close" id="close-btn">
            <span className="material-icons-sharp" onClick={toggleMenu}>
              close
            </span>
          </div>
        </div>

        {/** MENU LATERAL */}
        <nav className="sidebar">
          {menuTipoUsuario[tipoUsuario].map((menuItem, index) => (
            <Link
              key={index}
              to={menuItem.label === 'Sair' ? '/Login' : menuItem.click}
              onClick={(event) => {
                if (menuItem.label === 'Sair') {
                  navigate('/login');
                } else {
                  manipularCliqueSidebar(event, menuItem.label);
                  alterarTituloPagina(event, menuItem.label);
                }
              }}
            >
              <span className="material-icons-sharp">{menuItem.icon}</span>
              <h3>{menuItem.label}</h3>
            </Link>
          ))}
        </nav>
      </aside>

      <div className="right">
        <div className="top">
          <button id="menu-btn" onClick={toggleMenu}>
            <span className="material-icons-sharp">menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Definir os PropTypes para o componente Sidebar
Sidebar.propTypes = {
  onMenuItemClick: PropTypes.func.isRequired, // onMenuItemClick deve ser uma função obrigatória
};

export default Sidebar;
