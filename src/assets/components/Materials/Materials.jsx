// import Table from 'react-bootstrap/Table';
import { tipoUsuario, menuTipoUsuario } from '../Menu/sidebar.js';
import MaterialStudent from '../Student/MaterialStudent.jsx';
import MaterialTeacher from '../Teacher/MaterialTeacher.jsx';


function Materials() {
  let ComponenteMaterialUsuario;

  if (tipoUsuario === 'professor') {
    ComponenteMaterialUsuario = MaterialTeacher;
  } else if (tipoUsuario === 'aluno') {
    ComponenteMaterialUsuario = MaterialStudent;
  }
  console.log('Tipo de usuário:', tipoUsuario);
  return (
    <>
      <ComponenteMaterialUsuario/>
    </>
  );
}

export default Materials;
