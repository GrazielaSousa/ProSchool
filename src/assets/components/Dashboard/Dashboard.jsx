import CircularProgress from '../Progress/CircularProgress';
import Alert from '../Alert/Alert.jsx';
import './dashboard.scss';
import { tipoUsuario as tipoUsuarioGlobal } from './../Menu/sidebar';

function Dashboard() {
  return (
    <div className="container-dash">
      <Alert />
      {tipoUsuarioGlobal !== 'admin' && tipoUsuarioGlobal !== 'professor' && (
        <CircularProgress />
      )}
    </div>
  );
}

export default Dashboard;
