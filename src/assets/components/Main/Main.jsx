import './main.scss';
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard/Dashboard';
import Desempenho from '../Perform/Perform';
import Material from '../Materials/Materials';
import Sair from '../Logout/Logout.jsx';
import { RegistrarUsuario } from '../Admin/RegiserUser.jsx';
import { UsersTable } from '../Admin/UsersTable/Table.jsx';

function MainSection({ selectedMenuItem }) {
  // Mapeia selectedMenuItem para o componente correspondente
  const componentMap = {
    // label do meu : component
    Dashboard: Dashboard,
    Desempenho: Desempenho,
    Materiais: Material,
    'Usuários': UsersTable,
    'Cadastrar usuário': RegistrarUsuario,
    Sair: Sair,
  };
  // Atribui o valor correspondente ao objeto que foi clicado
  const SelectedComponent = componentMap[selectedMenuItem];

  return (
    /* Chama o componente correspondente pelo nome clicado */
    SelectedComponent ? <SelectedComponent /> : null
  );
}

MainSection.propTypes = {
  selectedMenuItem: PropTypes.string.isRequired, // Certifique-se de que selectedMenuItem é uma string obrigatória
};

export default MainSection;
