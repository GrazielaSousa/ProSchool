import { useState } from 'react';
import { SelectFunction } from '../Select/SelectFunction.jsx';
import './registerUser.scss';
import { InputRegister } from '../Forms/InputForm/InputRegister.jsx';

export const RegistrarUsuario = () => {
  const [formData, setDataForm] = useState({
    nomeUsuario: '',
    sobrenomeUsuario: '',
    turma: '',
    funcao: '',
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      [id]: value,
    }));
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (!value) {
      setDataForm((prevDataForm) => ({
        ...prevDataForm,
        [id]: '',
      }));
    }
  };

  // Função de callback para atualizar a propriedade 'funcao' em formData
  const handleSelectChange = (selectedFunction) => {
    setDataForm((prevDataForm) => ({
      ...prevDataForm,
      funcao: selectedFunction,
    }));
  };

  return (
    <div className="container-register">
      <InputRegister
        type="text"
        id="nomeUsuario"
        placeholder="Nome"
        autocomplete="off"
        label="Nome"
        name="nome"
        value={formData.nomeUsuario}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />

      <InputRegister
        type="text"
        id="sobrenomeUsuario"
        placeholder="Sobrenome"
        autocomplete="off"
        label="Sobrenome"
        name="sobrenome"
        value={formData.sobrenomeUsuario}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />

      <SelectFunction
        id="form_select"
        label="Selecione uma função"
        onChange={handleSelectChange}
        value={formData.funcao}
      />

      <InputRegister
        type="text"
        id="turma"
        placeholder="Turma"
        autocomplete="off"
        label="Turma"
        name="turma"
        value={formData.turma}
        onChange={handleInputChange}
      />

      <InputRegister
        type="text"
        id="responsavel"
        placeholder="Responsável"
        autocomplete="off"
        label="Responsável"
        name="responsavel"
        value={formData.responsavel}
        onChange={handleInputChange}
      />
      <div>
        <p>{formData.nomeUsuario}</p>
        <p>{formData.sobrenomeUsuario}</p>
        <p>{formData.funcao}</p>
      </div>
    </div>
  );
};
