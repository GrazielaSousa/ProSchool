import './main.scss';
import PropTypes from 'prop-types';
import Dashboard from '../Dashboard/Dashboard';
import Material from '../Materials/Materials';
import { RegistrarUsuario } from '../Admin/RegiserUser.jsx';
import { UsersTable } from '../Admin/UsersTable/Table.jsx';
import { UploadMaterial } from '../Materials/UploadMaterial.jsx';
import { AllMaterials } from '../Materials/AllMaterials.jsx';

function MainSection({ selectedMenuItem }) {

  // Mapeia selectedMenuItem para o componente correspondente
  const componentMap = {
    // label do meu : component
    Dashboard: Dashboard,
    Materiais: Material,
    'Usuários': UsersTable,
    'Cadastrar usuário': RegistrarUsuario,
    'Adicional material': UploadMaterial,
    'Todos materiais': AllMaterials,
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
