import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
// import { LoginUser } from '../assets/components/Login/LoginUser.jsx';
import { Login } from '../pages/Login.jsx';
import { tipoUsuario } from '../assets/components/Menu/sidebar.js';
import { Teste } from '../pages/Teste.jsx';
// LoginUser;
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        {/** Inserir PRIVATE no dashboard para ser algo mostrado apenas quando fizer login */}
        <Route path="/home" element={<Home tipoUsuario={tipoUsuario} />} />
        <Route path="/teste" element={<Teste />} />
      </Routes>
    </BrowserRouter>
  );
};
