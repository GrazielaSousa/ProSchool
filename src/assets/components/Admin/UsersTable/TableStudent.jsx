import { PropTypes } from 'prop-types';
import api from '../../../../api/api.js';
import { ToastContainer, Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ModalUser } from '../../Modal/ModalUser.jsx';

export const TableStudent = ({ currentItens, filter, updateUserList }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);


  const handleEdit = (usuario) => {
    setShowModal(true);
    setSelectedUserId(usuario._id);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // const filteredItens = filter
  //   ? currentItens.filter((item) =>
  //       item.firstName.toLowerCase().includes(filter)
  //     )
  //   : currentItens;

  const filteredItens = filter
  ? currentItens.filter((item) =>
      item.firstName.toLowerCase().includes(filter) ||
      item.gender.toLowerCase().includes(filter) ||
      item.educationalData.classroom.toLowerCase().includes(filter) ||
      item.educationalData.enrollmentNumber.toLowerCase().includes(filter)
    )
  : currentItens;


  const handleDelete = async (id) => {
    const deletedUser = await api.delete(`/deleteUser/${id}`);
    if (deletedUser) {
      const newUsers = currentItens.filter((user) => user._id !== id);
      updateUserList(newUsers);
      toast.success(deletedUser.data);
    }
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Gênero</th>
            <th>Turma</th>
            <th>Matrícula</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredItens
            .filter((usuario) => !usuario.admin)
            .map((usuario) => (
              <tr key={usuario._id}>
                <td>{usuario.firstName + ' ' + usuario.lastName}</td>
                <td>{usuario.gender}</td>
                <td>{usuario.educationalData.classroom}</td>
                <td>{usuario.educationalData.enrollmentNumber}</td>
                <td className="icons-action">
                  <span
                    className="material-icons-sharp edit_note"
                    onClick={() => handleEdit(usuario)}
                  >
                    edit_note
                  </span>
                  <span
                    className="material-icons-sharp delete"
                    onClick={() => handleDelete(usuario._id)}
                  >
                    delete
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Flip}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {showModal && (
        <ModalUser
          showModal={showModal}
          closeModal={closeModal}
          currentItens={currentItens}
          updateUserList={updateUserList}
          filteredItens={filteredItens}
          selectedUserId={selectedUserId}
        />
      )}
    </>
  );
};

TableStudent.propTypes = {
  currentItens: PropTypes.array,
  filter: PropTypes.string,
  updateUserList: PropTypes.func,
};
