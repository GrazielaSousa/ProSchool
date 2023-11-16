import './formsRegister.scss';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import api from '../../../api/api.js';

export const RegisterSchool = ({
  updateFieldData,
  formData,
  setIsFormValid,
  fieldValidations,
  setFieldValidations,
}) => {
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [enrollmentNumberExist, setEnrollmentNumberExist] = useState(false);

  async function getEnrollmentNumber(enrollmentNumber) {
    if (!enrollmentNumber) return;

    try {
      const response = await api.get(`/user/${enrollmentNumber}`);

      if (response.status === 409) {
        return true;
      } else if (response.status === 200) {
        return false;
      }
    } catch (error) {
      if(error.response.status === 409){
        return true;
      } else {
        return false;
      }
    }
  }

  const handleDegreeChange = (event) => {
    setSelectedDegree(event.target.value);
    handleFieldChange(event, 'degree');
  };

  const handlePeriodChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === selectedPeriod) {
      setSelectedPeriod(null);
    } else {
      setSelectedPeriod(selectedValue);
    }
    handleFieldChange(event, 'period');
  };

  const handleFieldChange = async (e, fieldName) => {
    let value = e.target.value;
    let isFieldValid;

    if (fieldName === 'enrollmentNumber') {
      const exists = await getEnrollmentNumber(value);
      setEnrollmentNumberExist(exists);
      if(exists){
        isFieldValid = false;
      } else {
        isFieldValid = true;
      }
      
    }

    if (fieldName === 'degree' || fieldName === 'period') {
      isFieldValid = value.trim() !== '';
    }

    updateFieldData(fieldName, value);
    updateValidation(fieldName, isFieldValid);

    const updatedFieldValidations = {
      ...fieldValidations,
      [fieldName]: isFieldValid,
    };

    setFieldValidations(updatedFieldValidations);

    const isFormValid =
      updatedFieldValidations.classroom &&
      updatedFieldValidations.degree &&
      updatedFieldValidations.period &&
      updatedFieldValidations.enrollmentNumber;
    setIsFormValid(isFormValid);
  };

  const handleBlur = (e, fieldName) => {
    if (fieldName === 'enrollmentNumber') {
      getEnrollmentNumber(e.target.value);
    }
    const span = e.target.parentNode.querySelector(
      '.material-icons-sharp.emergency'
    );

    if (enrollmentNumberExist) {
      span.classList.add('error');
      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        [fieldName]: false,
      }));
    } else if (!e.target.value || e.target.value.trim() === '') {
      span.classList.add('error');
      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        [fieldName]: false,
      }));
    } else {
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
        <label htmlFor="class" className="label-register">
          Turma
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          type="text"
          name="classroom"
          id="classroom"
          className="input-register"
          required
          value={formData.classroom || ''}
          onChange={(e) => handleFieldChange(e, 'classroom', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'classroom')}
        />
      </div>

      <div className="forms-register">
        <label htmlFor="degree" className="label-register">
          Escolaridade
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <select
          type="text"
          name="degree"
          id="degree"
          required
          className="select-register"
          value={selectedDegree || ''}
          onChange={handleDegreeChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>
            Selecione a Escolaridade
          </option>
          <option value="fundamental">Fundamental</option>
          <option value="medio">Médio</option>
        </select>
      </div>

      <div className="forms-register">
        <label htmlFor="period" className="label-register">
          Período
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <select
          type="text"
          name="period"
          id="period"
          required
          className="select-register"
          value={selectedPeriod || ''}
          onChange={handlePeriodChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>
            Selecione o Período
          </option>
          <option value="matutino">Matutino</option>
          <option value="vespertino">Vespertino</option>
          <option value="noturno">Noturno</option>
        </select>
      </div>

      <div className="forms-register">
        <label htmlFor="enrollmentNumber" className="label-register">
          Matrícula
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          type="text"
          name="enrollmentNumber"
          id="enrollmentNumber"
          className="input-register"
          required
          value={formData.enrollmentNumber || ''}
          onChange={(e) =>
            handleFieldChange(e, 'enrollmentNumber', setIsFormValid)
          }
          onBlur={(e) => handleBlur(e, 'enrollmentNumber')}
        />
        {enrollmentNumberExist && (
          <p className="error-message">Matrícula ja cadastrada em sistema</p>
        )}
      </div>
    </>
  );
};

RegisterSchool.propTypes = {
  updateFieldData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
  fieldValidations: PropTypes.object.isRequired,
  setFieldValidations: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};
