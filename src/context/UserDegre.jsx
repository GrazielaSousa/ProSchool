// UserContext.js
import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const UserDegree = ({ children }) => {
  const [degree, setDegree] = useState('');

  useEffect(() => {
    const storedDegree = localStorage.getItem('degree');
    if (storedDegree) {
      setDegree(storedDegree);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('degree', degree);
  }, [degree]);

  return (
    <UserContext.Provider value={{ degree, setDegree }}>
      {children}
    </UserContext.Provider>
  );
};

export const useDegree = () => useContext(UserContext);

UserDegree.propTypes = {
  children: PropTypes.node.isRequired,
};
