import './modal.scss';
import api from '../../../api/api.js';
import { useRef } from 'react';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ModalUser = ({
  showModal,
  closeModal,
  filteredItens,
  selectedUserId,
  updateUserList,
  currentItens,
}) => {
  const userToEdit = filteredItens.find((user) => user._id === selectedUserId);

  const [firstName, setFirstName] = useState(userToEdit.firstName);
  const [lastName, setLastName] = useState(userToEdit.lastName);
  const [email, setEmail] = useState(userToEdit.email);
  const [dateBirth, setDateBirth] = useState(userToEdit.dateBirth);
  const [cpf, setCpf] = useState(userToEdit.cpf);
  const [gender, setGender] = useState(userToEdit.gender);

  const [zip, setZip] = useState(userToEdit.address.zip);
  const [street, setStreet] = useState(userToEdit.address.street);
  const [neighborhood, setNeighborhood] = useState(
    userToEdit.address.neighborhood
  );
  const [complement, setComplement] = useState(userToEdit.address.complement);
  const [city, setCity] = useState(userToEdit.address.city);
  const [state, setState] = useState(userToEdit.address.state);

  const [classroom, setClassroom] = useState(
    userToEdit.educationalData.classroom
  );
  const [degree, setDegree] = useState(userToEdit.educationalData.degree);
  const [period, setPeriod] = useState(userToEdit.educationalData.period);
  const [enrollmentNumber, setEnrollmentNumber] = useState(
    userToEdit.educationalData.enrollmentNumber
  );

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const dateBirthRef = useRef(null);
  const cpfRef = useRef(null);
  const genderRef = useRef(null);
  const zipRef = useRef(null);
  const streetRef = useRef(null);
  const neighborhoodRef = useRef(null);
  const complementRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const classroomRef = useRef(null);
  const degreeRef = useRef(null);
  const periodRef = useRef(null);
  const enrollmentNumberRef = useRef(null);

  const saveUser = async () => {
    const result = await api.put(`/users/${selectedUserId}`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      dateBirth: dateBirth,
      cpf: cpf,
      gender: gender,
      address: {
        zip: zip,
        street: street,
        neighborhood: neighborhood,
        complement: complement,
        city: city,
        state: state,
      },
      educationalData: {
        degree: degree,
        classroom: classroom,
        period: period,
        enrollmentNumber: enrollmentNumber,
      },
    });

    if (result.status === 200) {
      // Atualize a lista currentItens para incluir o novo usuário
      const updatedUserIndex = currentItens.findIndex(
        (user) => user._id === selectedUserId
      );

      if (updatedUserIndex !== -1) {
        const updatedUsers = [...currentItens];
        updatedUsers[updatedUserIndex] = {
          _id: selectedUserId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          dateBirth: dateBirth,
          cpf: cpf,
          gender: gender,
          address: {
            zip: zip,
            street: street,
            neighborhood: neighborhood,
            complement: complement,
            city: city,
            state: state,
          },
          educationalData: {
            degree: degree,
            classroom: classroom,
            period: period,
            enrollmentNumber: enrollmentNumber,
          },
        };
        updateUserList(updatedUsers);
      }
    }
    closeModal();
    toast.success("Usuário atualizado com sucesso!");
  };
  return (
    <>
      <div>
        {showModal && (
          <div className="modal-background">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Editar usuário</h2>
              </div>
              <div className="modal-body">
                <div className="scrollable-content">
                  <form>
                    <div className="form-group">
                      <label htmlFor="inputField">Nome</label>
                      <input
                        type="text"
                        id="inputField"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        ref={firstNameRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Sobrenome</label>
                      <input
                        type="text"
                        id="inputField"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        ref={lastNameRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Gênero</label>
                      <input
                        type="text"
                        id="inputField"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        ref={genderRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">E-mail</label>
                      <input
                        type="text"
                        id="inputField"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={emailRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Data de nascimento</label>
                      <input
                        type="text"
                        id="inputField"
                        value={dateBirth}
                        onChange={(e) => setDateBirth(e.target.value)}
                        ref={dateBirthRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">CPF</label>
                      <input
                        type="text"
                        id="inputField"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        ref={cpfRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">CEP</label>
                      <input
                        type="text"
                        id="inputField"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        ref={zipRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Endereço</label>
                      <input
                        type="text"
                        id="inputField"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        ref={streetRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Bairro</label>
                      <input
                        type="text"
                        id="inputField"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        ref={neighborhoodRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Complemento</label>
                      <input
                        type="text"
                        id="inputField"
                        value={complement}
                        onChange={(e) => setComplement(e.target.value)}
                        ref={complementRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Cidade</label>
                      <input
                        type="text"
                        id="inputField"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        ref={cityRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Estado</label>
                      <input
                        type="text"
                        id="inputField"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        ref={stateRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Turma</label>
                      <input
                        type="text"
                        id="inputField"
                        value={classroom}
                        onChange={(e) => setClassroom(e.target.value)}
                        ref={classroomRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Escolaridade</label>
                      <input
                        type="text"
                        id="inputField"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        ref={degreeRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Período</label>
                      <input
                        type="text"
                        id="inputField"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        ref={periodRef}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputField">Matrícula</label>
                      <input
                        type="text"
                        id="inputField"
                        value={enrollmentNumber}
                        onChange={(e) => setEnrollmentNumber(e.target.value)}
                        ref={enrollmentNumberRef}
                      />
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={closeModal}>Cancelar</button>
                <button onClick={saveUser}>Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

ModalUser.propTypes = {
  closeModal: PropTypes.func.isRequired,
  currentItens: PropTypes.array.isRequired,
  selectedUserId: PropTypes.string.isRequired,
  showModal: PropTypes.bool.isRequired,
  updateUserList: PropTypes.func.isRequired,
  filteredItens: PropTypes.array.isRequired,
};
