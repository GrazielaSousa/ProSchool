import './table.scss';
import { TableStudent } from './TableStudent.jsx';
import { TableTeacher } from './TableTeacher.jsx';
import professorLista from './Json/professores.json';
import { useEffect, useState } from 'react';
import { Pagination } from '../../Pagination/Pagination.jsx';
import api from '../../../../api/api.js';

export const UsersTable = () => {
  const [itensPerPage, setItensPerPage] = useState(11);
  const [currentPage, setCurrentPage] = useState(0);
  const [startPage, setStartPage] = useState(0);
  const [activeButton, setActiveButton] = useState('Aluno');
  const [filter, setFilter] = useState('');
  const [allData, setAllData] = useState([]);

  async function gellAllData() {
    const response = await api.get('/');
    setAllData(response.data);
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

  const filteredProfessorLista = professorLista.filter((item) =>
    item.Nome.toLowerCase().includes(filter)
  );

  // Calcula a quantidade de páginas com base nos dados filtrados
  const totalPages = Math.ceil(
    activeButton === 'Aluno'
      ? filteredData.length / itensPerPage
      : filteredProfessorLista.length / itensPerPage
  );

  // Calcula o índice final com base nos dados filtrados
  const endIndex = Math.min(
    activeButton === 'Aluno'
      ? filteredData.length
      : filteredProfessorLista.length,
    startPage * itensPerPage + itensPerPage
  );

  // Obtém os dados a serem exibidos na página atual com base nos dados filtrados
  const currentItens =
    activeButton === 'Aluno'
      ? filteredData.slice(startPage * itensPerPage, endIndex)
      : filteredProfessorLista.slice(startPage * itensPerPage, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setFilter('');
    setCurrentPage(0);
  };

  const handleChangeInput = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

    console.log(allData);

  return (
    <div className="main-users">
      <div className="header-buttton">
        <button
          onClick={() => handleButtonClick('Aluno')}
          className={`btn ${activeButton === 'Aluno' ? 'active' : ''}`}
        >
          Aluno
        </button>

        <button
          onClick={() => handleButtonClick('Professor')}
          className={`btn ${activeButton === 'Professor' ? 'active' : ''}`}
        >
          Professor
        </button>
      </div>
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
        {/** Carregar dinamicamente pelo button */}
        {activeButton === 'Aluno' ? (
          <TableStudent currentItens={currentItens} filter={filter} />
        ) : (
          <TableTeacher currentItens={currentItens} filter={filter} />
        )}
        {currentItens.length === 0 && (
          <span className="table-empty">Nenhum resultado encontrado</span>
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
