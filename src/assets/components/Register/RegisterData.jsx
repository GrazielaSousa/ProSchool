import './formsRegister.scss';
import { useForm } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import { useState } from 'react';

export const RegisterData = ({
  updateFieldData,
  formData,
  setIsFormValid,
  fieldValidations,
  setFieldValidations,
}) => {
  const { register } = useForm();

  const [selectedGender, setSelectedGender] = useState('');
  const [errors, setErrors] = useState({});

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    handleFieldChange(event, 'gender');
    console.log(event.target.value);
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
    console.log(value);

    if (fieldName === 'dateBirth') {
      value = dateBirthMask(value);
    }

    if (fieldName === 'cpf') {
      value = cpfMask(value);
    }

    if(fieldName === 'confirmPassword') {
      if(value !== formData.password) {
        setErrors({confirmPassword: 'Senhas não coincidem'})
        console.log(errors);
      } else {
        setErrors({confirmPassword: ''})
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

  const handleBlur = (e, fieldName) => {
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
    console.log(fieldValidations);
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
          // {...register('firstName', {
          //   required: true,
          //   minLength: 3,
          // })}
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
          {...register('lastName', {
            required: true,
            minLength: 3,
          })}
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
        <label htmlFor="dateBirth" className="label-register">
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
      </div>

      <div className="forms-register">
        <label htmlFor="gender" className="label-register">
          Selecione o gênero{' '}
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <select
          id="gender"
          name="gender"
          className="select-register"
          value={selectedGender}
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
        <label htmlFor="dateBirth" className="label-register">
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
        <label htmlFor="dateBirth" className="label-register">
          Senha
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
          onChange={(e) => handleFieldChange(e, 'confirmPassword', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'confirmPassword')}
        />
      {errors.confirmPassword && <small className='error-password'>{errors.confirmPassword}</small>}
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
