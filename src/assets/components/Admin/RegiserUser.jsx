import { HeaderRegister } from '../Header/HeaderRegister.jsx';
import { RxArrowLeft, RxArrowRight, RxCheck } from 'react-icons/rx';
import './registerUser.scss';
import { useState } from 'react';

import api from '../../../api/api.js';

// Hooks
import { useForm } from '../../../hooks/useForm';

import { RegisterAddress } from '../Register/RegisterAddress.jsx';
import { RegisterSchool } from '../Register/RegisterSchool.jsx';
import { RegisterData } from '../Register/RegisterData';

const templateData = {
  firstName: '',
  lastName: '',
  email: '',
  dateBirth: '',
  cpf: '',
  gender: '',
  password: '',
};

export const RegistrarUsuario = () => {
  const [formData, setFormData] = useState(templateData);
  const [isFormValid, setIsFormValid] = useState(false);

  const updateFieldData = (key, value) => {
    setFormData((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const stepsComponent = [
    <RegisterData
      key="register-data"
      formData={formData}
      updateFieldData={updateFieldData}
      setIsFormValid={setIsFormValid}
    />,
    <RegisterAddress
      key="register-address"
      formData={formData}
      updateFieldData={updateFieldData}
      setIsFormValid={setIsFormValid}
    />,
    <RegisterSchool
      key="register-school"
      formData={formData}
      updateFieldData={updateFieldData}
    />,
  ];

  const { currentStep, currentComponent, changeStep, isLastStep, isFirstStep } =
    useForm(stepsComponent);

  async function handleSubmit() {
    try {
      const response = await api.post('/usuarios', {
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
    }
  }

  return (
    <div className="c-container">
      <div className="container-register">
        <HeaderRegister currentStep={currentStep} />
        <div className="container-steps">
          <form
            className="form-container"
            onSubmit={(e) => {
              e.preventDefault();
              if (isFormValid) {
                changeStep(currentStep + 1, e);
              }
            }}
          >
            <div className="input-component">{currentComponent}</div>
            <div className="actions-buttons">
              {!isFirstStep && (
                <button
                  disabled={currentStep === 0}
                  className={`button-back ${
                    currentStep > 0 ? 'active' : 'inactive'
                  }`}
                  type="button"
                  onClick={() => changeStep(currentStep - 1)}
                >
                  <RxArrowLeft
                    className={`icon-register ${
                      currentStep > 0 ? 'active' : 'inactive'
                    }`}
                  />
                  <span
                    className={`text-button-register ${
                      currentStep > 0 ? 'active' : 'inactive'
                    }`}
                  >
                    Voltar
                  </span>
                </button>
              )}

              {!isLastStep ? (
                <button
                  onClick={() => handleSubmit()}
                  className={`button-next ${
                    currentStep >= 0 && isFormValid ? 'active' : 'inactive'
                  }`}
                  type="submit"
                >
                  <span
                    className={`text-button-register ${
                      currentStep >= 0 && isFormValid ? 'active' : 'inactive'
                    }`}
                  >
                    Avançar
                  </span>
                  <RxArrowRight
                    className={`icon-register ${
                      currentStep >= 0 && isFormValid ? 'active' : 'inactive'
                    }`}
                  />
                </button>
              ) : (
                <button
                  className={`button-next ${
                    currentStep >= 0 ? 'active' : 'inactive'
                  }`}
                  type="button"
                >
                  <span
                    className={`text-button-register ${
                      currentStep >= 0 ? 'active' : 'inactive'
                    }`}
                  >
                    Enviar
                  </span>
                  <RxCheck
                    className={`icon-register ${
                      currentStep >= 0 ? 'active' : 'inactive'
                    }`}
                  />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
