import { PropTypes } from 'prop-types';

export const TableTeacher = ({ currentItens, filter }) => {
  const filteredItens = filter
    ? currentItens.filter((item) => item.Nome.toLowerCase().includes(filter))
    : currentItens;
  console.log(currentItens);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Gênero</th>
            <th>Turma</th>
            <th>ID</th>
            <th>Matéria</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredItens.map((usuario) => (
            <tr key={usuario.ID}>
              <td>{usuario.Nome}</td>
              <td>{usuario.Gênero}</td>
              <td>{usuario.Turma}</td>
              <td>{usuario.ID}</td>
              <td>{usuario.Matéria}</td>
              <td>{usuario.Email}</td>
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

TableTeacher.propTypes = {
  currentItens: PropTypes.array,
  filter: PropTypes.string,
};
