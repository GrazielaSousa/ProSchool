import './main.scss';
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard/Dashboard';
import Desempenho from '../Perform/Perform';
import Material from '../Materials/Materials';
import { RegistrarUsuario } from '../Admin/RegiserUser.jsx';
import { UsersTable } from '../Admin/UsersTable/Table.jsx';
import { UploadMaterial } from '../Materials/UploadMaterial.jsx';

function MainSection({ selectedMenuItem }) {

  // Mapeia selectedMenuItem para o componente correspondente
  const componentMap = {
    // label do meu : component
    Dashboard: Dashboard,
    Desempenho: Desempenho,
    Materiais: Material,
    'Usuários': UsersTable,
    'Cadastrar usuário': RegistrarUsuario,
    'Adicional material': UploadMaterial,
  };
  // Atribui o valor correspondente ao objeto que foi clicado
  const SelectedComponent = componentMap[selectedMenuItem];

  return (
    SelectedComponent ? <SelectedComponent /> : null
  );
}

MainSection.propTypes = {
  selectedMenuItem: PropTypes.string.isRequired,
};

export default MainSection;
