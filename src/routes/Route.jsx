import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import { Login } from '../pages/Login.jsx';
import { tipoUsuario } from '../assets/components/Menu/sidebar.js';
// LoginUser;
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login showResetAcess={false} />} />
        <Route
          path="/resetar-senha"
          element={<Login showResetAcess={true} />}
        />
        <Route path="/home" element={<Home tipoUsuario={tipoUsuario} />} />
      </Routes>
    </BrowserRouter>
  );
};
