import './formsRegister.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

export const RegisterData = ({ updateFieldData, formData, setIsFormValid }) => {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [fieldValidations, setFieldValidations] = useState({
    firstName: false,
    lastName: false,
    // Adicione outros campos e defina-os como false
  });

  const updateValidation = (key, isValid) => {
    setFieldValidations((prevValidations) => ({
      ...prevValidations,
      [key]: isValid,
    }));
  };

  const handleBlur = (e, fieldName) => {
    if (!e.target.value || e.target.value.trim() === '') {
      const span = e.target.parentNode.querySelector(
        '.material-icons-sharp.emergency'
      );
      if (span) {
        span.classList.add('error');
      }
      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        [fieldName]: false,
      }));
    } else {
      const span = e.target.parentNode.querySelector(
        '.material-icons-sharp.emergency'
      );
      if (span) {
        span.classList.remove('error');
      }
      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        [fieldName]: true,
      }));
    }
  };

  const handleFieldChange = (e, fieldName) => {
    const value = e.target.value;
    updateFieldData(fieldName, value);
    const isFieldValid = value.trim() !== '';
    updateValidation(fieldName, isFieldValid);

    const span = e.target.parentNode.querySelector('.material-icons-sharp.emergency');
    if (span) {
      if (isFieldValid) {
        span.classList.remove('error');
      } else {
        span.classList.add('error');
      }
    }

    // Agora, atualize o estado de isFormValid com base na validação dos campos
    const isFormValid = Object.values(fieldValidations).every((field) => field);
    setIsFormValid(isFormValid);
  };


  return (
    <>
      <div className="forms-register">
        <label htmlFor="firstName" className="label-register">
          Nome
          <span
            className={`material-icons-sharp emergency ${
              fieldValidations.firstName ? 'error' : ''
            }`}
          >
            emergency
          </span>
        </label>
        <input
        required
          {...register('firstName', {
            required: true,
            minLength: 3,
          })}
          type="text"
          name="firstName"
          id="firstName"
          className={`input-register ${errors?.firstName ? 'error' : ''}`}
          value={formData.firstName || ''}
          onChange={(e) => handleFieldChange(e, 'firstName', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'firstName')}
        />
      </div>

      <div className="forms-register">
        <label htmlFor="lastName" className="label-register">
          Sobrenome
          <span
            className={`material-icons-sharp emergency ${
              fieldValidations.lastName ? 'error' : ''
            }`}
          >
            emergency
          </span>
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
          className={`input-register ${errors?.lastName ? 'error' : ''}`}
          value={formData.lastName || ''}
          onChange={(e) => handleFieldChange(e, 'lastName', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'lastName')}
        />
      </div>
    </>
  );
};

RegisterData.propTypes = {
  updateFieldData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
};
