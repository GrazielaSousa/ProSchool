import { tipoUsuario} from '../Menu/sidebar.js';

// tipoUsuario com a 1° letra em maiuscula
function userUppercase () {
  let uppercaseUsuario = tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1);
  return uppercaseUsuario;
}

export default userUppercase;
