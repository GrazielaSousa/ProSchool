// import "./assets/styles/menu.scss";
import { AppRouter } from './routes/Route.jsx';
import { UserProvider } from './context/UserContext.jsx';

const App = () => {
  return (
    <div className="container-rota">
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </div>
  );
};

export default App;
