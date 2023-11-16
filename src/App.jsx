import { AppRouter } from './routes/Route.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { UserDegree } from './context/UserDegre.jsx';

const App = () => {
  return (
    <div className="container-rota">
      <UserProvider>
        <UserDegree>
          <AppRouter />
        </UserDegree>
      </UserProvider>
    </div>
  );
};

export default App;
