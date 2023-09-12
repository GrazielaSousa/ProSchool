// UserContext.js
import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');

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
