// UserContext.js
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('nomeUsuario');
    if (storedUser) {
      setNomeUsuario(storedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('nomeUsuario', nomeUsuario);
  }, [nomeUsuario]);

  return (
    <UserContext.Provider value={{ nomeUsuario, setNomeUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
