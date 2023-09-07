import { Navigate } from "react-router-dom"
import Home from "../pages/Home.jsx"
import {PropTypes} from 'prop-types'


export const PrivateRoute = ({children, isAuthenticated}) => {
  return (
    isAuthenticated ? children : (<Navigate to={<Home />}/>)
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};