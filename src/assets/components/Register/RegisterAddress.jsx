import './formsRegister.scss';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const RegisterAddress = ({
  updateFieldData,
  formData,
  setIsFormValid,
  fieldValidations,
  setFieldValidations,
  setFormData,
}) => {
  const {setValue } = useForm();
  const [uf, setUf] = useState([]);


  useEffect(() => {
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(
      (response) =>
        response.json().then((data) => {
          setUf(data);
        })
    );
  }, []);

  const formatCEP = (value) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  };

  const handleFieldChange = (e, fieldName) => {
    let value = e.target.value;

    if (fieldName === 'zip') {
      value = formatCEP(value);
    }

    const isFieldValid = value.trim() !== '';
    updateFieldData(fieldName, value);
    updateValidation(fieldName, isFieldValid);

    const updatedFieldValidations = {
      ...fieldValidations,
      [fieldName]: isFieldValid,
    };

    setFieldValidations(updatedFieldValidations);

    const isFormValid = updatedFieldValidations.zip;
    setIsFormValid(isFormValid);
  };

  const handleBlur = (e, fieldName) => {
    if (fieldName === 'zip') {
      const zip = e.target.value.replace(/\D/g, '');
      fetch(`https://viacep.com.br/ws/${zip}/json/`).then((response) =>
        response.json().then((data) => {
          if (data.logradouro) {
            // Busca pela sigla da UF a UF por extenso
            const stateExtension = uf.find((uf) => uf.sigla === data.uf);

            setFormData((prevData) => ({
              ...prevData,
              zip: data.cep,
              address: data.logradouro,
              neighborhood: data.bairro,
              complement: data.complemento,
              city: data.localidade,
              state: stateExtension.nome,
            }));

            setFieldValidations((prevValidations) => ({
              ...prevValidations,
              city: true,
              address: true,
              neighborhood: true,
              state: true,
            }));
          } else {
            setValue('address', '');
            setValue('neighborhood', '');
            setValue('city', '');
            setValue('state', '');
            setFormData({
              ...formData,
              address: '',
              neighborhood: '',
              city: '',
              state: '',
            });
          }
        })
      );
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
      <div className="forms-register zip" style={{ marginLeft: '-11.2rem' }}>
        <label htmlFor="zip" className="label-register">
          CEP <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          style={{ width: 'min-content' }}
          type="text"
          name="zip"
          id="zip"
          className="input-register"
          required
          placeholder="00000-00"
          value={formData.zip || ''}
          onChange={(e) => handleFieldChange(e, 'zip', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'zip')}
        />
      </div>

      <div className="forms-register address" style={{ marginLeft: '-16rem' }}>
        <label htmlFor="address" className="label-register">
          Rua <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          type="text"
          style={{ width: '600px' }}
          name="address"
          id="address"
          required
          className="input-register"
          value={formData.address || ''}
          onChange={(e) => handleFieldChange(e, 'address', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'address')}
        />
      </div>

      <div className="forms-register">
        <label htmlFor="neighborhood" className="label-register">
          Bairro
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          type="text"
          name="neighborhood"
          id="neighborhood"
          required
          className="input-register"
          value={formData.neighborhood || ''}
          onChange={(e) => handleFieldChange(e, 'neighborhood', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'neighborhood')}
        />
      </div>

      <div className="forms-register">
        <label htmlFor="complement" className="label-register">
          Complemento
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          type="text"
          name="complement"
          id="complement"
          required
          className="input-register"
          value={formData.complement || ''}
          onChange={(e) => handleFieldChange(e, 'complement', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'complement')}
        />
      </div>

      <div className="forms-register">
        <label htmlFor="city" className="label-register">
          Cidade
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input
          type="text"
          name="city"
          id="city"
          required
          className="input-register"
          value={formData.city || ''}
          onChange={(e) => handleFieldChange(e, 'city', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'city')}
        />
      </div>

      <div className="forms-register">
        <label htmlFor="state" className="label-register">
          Estado
          <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <select
          type="text"
          name="state"
          id="state"
          required
          className="select-register"
          value={formData.state || ''}
          onChange={(e) => handleFieldChange(e, 'state', setIsFormValid)}
          onBlur={(e) => handleBlur(e, 'state')}
        >
          <option value="0" disabled>
            Selecione o Estado
          </option>
          {uf.map((uf) => (
            <option key={uf.id} value={uf.nome}>
              {uf.nome}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

RegisterAddress.propTypes = {
  updateFieldData: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setIsFormValid: PropTypes.func.isRequired,
  fieldValidations: PropTypes.object.isRequired,
  setFieldValidations: PropTypes.func.isRequired,
  setFormData: PropTypes.func.isRequired,
};
