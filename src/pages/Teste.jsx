import { useUser } from '../context/UserContext.jsx'; // Importe o useUserContext

export const Teste = () => {
  const { nomeUsuario } = useUser(); // Use o nomeUsuario do contexto

  return (
    <div>
      <h2>Bem vindo {nomeUsuario}</h2>
    </div>
  );
};
