import './table.scss';
import { TableStudent } from './TableStudent.jsx';
import { useEffect, useState } from 'react';
import { Pagination } from '../../Pagination/Pagination.jsx';
import api from '../../../../api/api.js';

export const UsersTable = () => {
  const [itensPerPage, setItensPerPage] = useState(11);
  const [currentPage, setCurrentPage] = useState(0);
  const [startPage, setStartPage] = useState(0);
  const [filter, setFilter] = useState('');
  const [allData, setAllData] = useState([]);

  async function gellAllData() {
    const response = await api.get('/');
    const students = response.data.filter((user) => !user.admin);
    setAllData(students);
  }

  useEffect(() => {
    gellAllData();
  }, []);

  useEffect(() => {
    setStartPage(currentPage);
  }, [currentPage]);

  // Calcula paginação com base nos dados filtrados
  const filteredData = allData.filter((item) =>
    item.firstName.toLowerCase().includes(filter)
  );

  // Calcula a quantidade de páginas com base nos dados filtrados
  const totalPages = Math.ceil(filteredData.length / itensPerPage);

  // Calcula o índice final com base nos dados filtrados
  const endIndex = Math.min(
    filteredData.length,
    startPage * itensPerPage + itensPerPage
  );

  // Obtém os dados a serem exibidos na página atual com base nos dados filtrados
  const currentItens = filteredData.slice(startPage * itensPerPage, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeInput = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const updateUserList = (newUsers) => {
    setAllData(newUsers);
  };

  return (
    <div className="main-users">
      <div className="input-container">
        <input
          type="search"
          onChange={handleChangeInput}
          className="input-search"
          placeholder="Buscar"
          value={filter}
        />
      </div>
      <div className="table-container">
        <TableStudent
          currentItens={currentItens}
          filter={filter}
          setFilter={setFilter}
          updateUserList={updateUserList}
        />
        {currentItens.length === 0 && (
          <span className="table-empty">Nenhum aluno encontrado</span>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        isPaginationEnabled={currentItens.length > 0}
      />
    </div>
  );
};
