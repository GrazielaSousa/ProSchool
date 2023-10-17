import './formsRegister.scss';

export const RegisterAddress = ({ updateFieldData, formData, setIsFormValid}) => {

  return (
    <>
      <div className="forms-register">
        <label htmlFor="cep" className="label-register">
          CEP <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input type="text" name="cep" id="cep" className="input-register" />
      </div>
      <div className="forms-register">
        <label htmlFor="cep" className="label-register">
          CEP <span className="material-icons-sharp emergency">emergency</span>
        </label>
        <input type="text" name="cep" id="cep" className="input-register" />
      </div>
    </>
  );
};
