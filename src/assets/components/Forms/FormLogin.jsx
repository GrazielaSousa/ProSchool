import { useState } from 'react';
import './form_login.scss';
import { useNavigate } from 'react-router-dom';

function FormLogin (){
  // Input fica nulo quando perder o focus
  const [inputValue, setInputValue] = useState({
    email: '',
    password: ''
  });
  

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [id]: value
    }));
  };

  const handleBlur = (event) => {
    const { id, value } = event.target;
    if (!value) {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        [id]: ''
      }));
    }
  };

  const navigate = useNavigate(); 
  const handleAcessarClick = () => {
    navigate('/Home');
  };
  return (
    <div className="container-form">
      <div className="form">
        <input 
        type="text" 
        id="email" 
        className="form_input" 
        autoComplete="off" 
        placeholder={inputValue.email ? '' : 'Login'}
        value={inputValue.email}
        onChange={handleInputChange}
        onBlur={handleBlur}/>
        <label
        htmlFor="email" 
        className="form_label"
        >Login</label>
      </div>
      
      <div className="form">
        <input 
        type="password" 
        className="form_input"
        placeholder={inputValue.password ? '' : 'Senha'}
        value={inputValue.password}
        id="password"
        onChange={handleInputChange} />
        <label 
        htmlFor="password"
        className='form_label'>Senha</label>
      </div>

      <div className="save-password">
      <div className="container-senha">
        <input type="checkbox" className="btn-checkbox" id="checkbox" />
        <label htmlFor="checkbox" className="label-checkbox" >Lembrar-me</label> 
      </div>
      <span className='reset-password'>Esqueceu sua senha?</span>
      </div>


      <div className="container-btn">
        <button className="btn-submit" onClick={handleAcessarClick}>Acessar</button>
      </div>
    </div>
    
  )
} 

export default FormLogin;