import {menuTipoUsuario} from './../Menu/sidebar';
import { PropTypes } from 'prop-types';

function Settings ({tipoUsuario}) {
  const tipoUsuarioObject = menuTipoUsuario[tipoUsuario];

  const settingsOption = tipoUsuarioObject;
  // switch (tipoUsuario) {
  //   case 'aluno':
  //     break;
  //   case 'professor':
  //     break;
  //   case 'responsavel':
  //     break;
  //   case 'admin':
  //     title = `Bem vindo ${tipoUsuario}`;
  //     break;
  //   default:
  //     // Lógica de tratamento para tipos de usuário desconhecidos
  //     break;
  // }
  return (
    <>
    <h1>a</h1>
    </>
  );
}

Settings.propTypes = {
  tipoUsuario : PropTypes.string,
}

export default Settings;