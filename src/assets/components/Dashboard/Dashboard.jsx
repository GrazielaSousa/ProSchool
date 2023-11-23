import './dashboard.scss';
import { tipoUsuario as tipoUsuarioGlobal } from './../Menu/sidebar';

function Dashboard() {
  return (
    <div className="container-dash">
      {tipoUsuarioGlobal !== 'admin' && tipoUsuarioGlobal !== 'professor'}
    </div>
  );
}

export default Dashboard;
