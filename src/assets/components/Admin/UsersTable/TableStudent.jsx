import { PropTypes } from 'prop-types';

export const TableStudent = ({ currentItens, filter }) => {
  const filteredItens = filter
    ? currentItens.filter((item) => item.firstName.toLowerCase().includes(filter))
    : currentItens;

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
          {filteredItens.map((usuario) => (
            <tr key={usuario._id}>
              <td>{usuario.firstName}</td>
              {/* <td>{usuario.gender}</td>
              <td>{usuario.educationalData.class}</td>
              <td>{usuario.educationalData.enrollmentNumber}</td> */}
              <td className="icons-action">
                <span className="material-icons-sharp edit_note">
                  edit_note
                </span>
                <span className="material-icons-sharp delete">delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

TableStudent.propTypes = {
  currentItens: PropTypes.array,
  filter: PropTypes.string,
};
