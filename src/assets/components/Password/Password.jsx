import { InputField } from '../Forms/InputForm/InputField.jsx';
import { useState } from 'react';

export const Password = () => {
  const [inputValue, setInputValue] = useState({
    code: '',
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValue((prevInputValue) => ({
      ...prevInputValue,
      [id]: value,
    }));
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (!value) {
      setInputValue((prevInputValue) => ({
        ...prevInputValue,
        [id]: '',
      }));
    }
  };
  return (
    <>
      <InputField
        title="Resetar senha"
        type="text"
        id="email"
        className="form_input"
        autoComplete="off"
        placeholder={inputValue.code ? '' : 'E-mail'}
        value={inputValue.code}
        onChange={handleInputChange}
        onBlur={handleBlur}
        label="E-mail"
      />
    </>
  );
};
