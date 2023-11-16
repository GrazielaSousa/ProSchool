import './formsRegister.scss';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { cpf } from 'cpf-cnpj-validator';
import api from './../../../api/api';

export const RegisterData = ({
  updateFieldData,
  formData,
  setIsFormValid,
  fieldValidations,
  setFieldValidations,
}) => {

  const [selectedGender, setSelectedGender] = useState('');
  const [errors, setErrors] = useState({});

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    handleFieldChange(event, 'gender');
  };

  const dateBirthMask = (value) => {
    const cleanedValue = value.replace(/\D/g, '');

    const day = cleanedValue.slice(0, 2);
    const month = cleanedValue.slice(2, 4);
    const year = cleanedValue.slice(4, 8);

    const formattedDate = [day, month, year].filter(Boolean).join('/');

    return formattedDate.substring(0, 10);
  };

  const cpfMask = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleFieldChange = (e, fieldName) => {
    let value = e.target.value;

    if (fieldName === 'dateBirth') {
      value = dateBirthMask(value);
    }

    if (fieldName === 'cpf') {
      value = cpfMask(value);
      if (cpf.isValid(value)) {
        setErrors({ cpf: '' });
      } else {
        setErrors({ cpf: 'CPF inválido' });
      }
    }

    if (fieldName === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors({ confirmPassword: 'Senhas não coincidem' });
      } else {
        setErrors({ confirmPassword: '' });
      }
    }

    const isFieldValid = value.trim() !== '';
    updateFieldData(fieldName, value);
    updateValidation(fieldName, isFieldValid);

    const updatedFieldValidations = {
      ...fieldValidations,
      [fieldName]: isFieldValid,
    };
    setFieldValidations(updatedFieldValidations);
    const isFormValid =
      updatedFieldValidations.firstName &&
      updatedFieldValidations.lastName &&
      updatedFieldValidations.email &&
      updatedFieldValidations.dateBirth &&
      updatedFieldValidations.cpf &&
      updatedFieldValidations.gender &&
      updatedFieldValidations.gender &&
      updatedFieldValidations.password &&
      updatedFieldValidations.confirmPassword;
    setIsFormValid(isFormValid);
  };


  async function getCpfOrEmail(cpfOrEmail) {
    if (!cpfOrEmail) return;

    try {
      const response = await api.get(`/user/data/${cpfOrEmail}`);

      const { errorID, message, data } = response.data;

      if (errorID === 'email' && data === formData.email) {
        setErrors({ email: message });

      } else if (errorID === 'cpf' && data === formData.cpf) {
        setErrors({ cpf: message });
      } else {
        setErrors({ email: '' });
        setErrors({ cpf: '' });
      }
    } catch (error) {
      setErrors({});
    }
  }

  const handleBlur = (e, fieldName) => {
    if (fieldName === 'email' || fieldName === 'cpf') {
      getCpfOrEmail(e.target.value);
    }

    if (!e.target.value || e.target.value.trim() === '') {
      const span = e.target.parentNode.querySelector(
        '.material-icons-sharp.emergency'
      );
      span.classList.add('error');

      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        [fieldName]: false,
      }));
    } else {
      const span = e.target.parentNode.querySelector(
        '.material-icons-sharp.emergency'
      );
      span.classList.remove('error');

      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        [fieldName]: true,
      }));
    }
  };

  const updateValidation = (key, isValid) => {
    setFieldValidations((prevValidations) => ({
      ...prevValidations,
      [key]: isValid,
    }));
  };

  return (
    <>
      <div className="forms-register">
        <label htmlFor="firstName" className="label-register">
          Nome
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          minLength="3"
          required
          type="text"
          name="firstName"
          id="firstName"
          className="input-register"
          value={formData.firstName || ''}
          onChange={(e) => handleFieldChange(e, 'firstName', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'firstName')}
        />
      </div>

      <div className="forms-register">
        <label htmlFor="lastName" className="label-register">
          Sobrenome
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          required
          type="text"
          name="lastName"
          id="lastName"
          className="input-register"
          value={formData.lastName || ''}
          onChange={(e) => handleFieldChange(e, 'lastName', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'lastName')}
        />
      </div>

      <div className="forms-register">
        <label htmlFor="email" className="label-register">
          E-mail
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          required
          minLength="15"
          name="email"
          id="email"
          placeholder="email@example.com"
          type="text"
          className="input-register"
          value={formData.email || ''}
          onChange={(e) => handleFieldChange(e, 'email', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'email')}
        />
        {errors && <small className="error-input">{errors.email}</small>}
      </div>

      <div className="forms-register">
        <label htmlFor="dateBirth" className="label-register">
          Data de nascimento
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          required
          minLength="10"
          name="dateBirth"
          id="dateBirth"
          placeholder="dd/mm/yyyy"
          type="text"
          className="input-register"
          value={formData.dateBirth || ''}
          onChange={(e) => handleFieldChange(e, 'dateBirth', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'dateBirth')}
        />
      </div>

      <div className="forms-register">
        <label htmlFor="cpf" className="label-register">
          CPF
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          required
          minLength="14"
          name="cpf"
          id="cpf"
          placeholder="XXX.XXX.XXX-XX"
          type="cpf"
          className="input-register"
          value={formData.cpf || ''}
          onChange={(e) => handleFieldChange(e, 'cpf', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'cpf')}
        />
        {errors && <small className="error-input">{errors.cpf}</small>}
      </div>

      <div className="forms-register">
        <label htmlFor="gender" className="label-register">
          Selecione o gênero
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <select
          id="gender"
          name="gender"
          className="select-register"
          value={selectedGender || ''}
          onChange={handleGenderChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>
            Selecione
          </option>
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
        </select>
      </div>

      <div className="forms-register">
        <label htmlFor="password" className="label-register">
          Senha
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          required
          minLength="8"
          name="password"
          id="password"
          placeholder="*************"
          type="password"
          className="input-register"
          value={formData.password || ''}
          onChange={(e) => handleFieldChange(e, 'password', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'password')}
        />
      </div>
      <div className="forms-register">
        <label htmlFor="confirmPassword" className="label-register">
          Confirmar senha
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          required
          minLength="8"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="*************"
          type="password"
          className="input-register"
          value={formData.confirmPassword || ''}
          onChange={(e) =>
            handleFieldChange(e, 'confirmPassword', setIsFormValid)
          }
          onBlur={(e) => handleBlur(e, 'confirmPassword')}
        />
        {errors.confirmPassword && (
          <small className="error-input">{errors.confirmPassword}</small>
        )}
      </div>
    </>
  );
};

RegisterData.propTypes = {
  updateFieldData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
  fieldValidations: PropTypes.object.isRequired,
  setFieldValidations: PropTypes.func.isRequired,
};
