import icon from '../../../../public/icon-pdf.svg';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './list.scss';
import { PropTypes } from 'prop-types';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useRef, useState } from 'react';

export const ListPdf = ({ materials, onDelete }) => {
  const toast = useRef(null);
  const [deleteFile, setDeleteFile] = useState(false);

  const accept = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Confirmado',
      detail: 'Arquivo deletado com sucesso',
      life: 3000,
      onclick: onDelete(materials._id),
    });
    setTimeout(() => {
      setDeleteFile(false);
    }, 500);
  };

  const reject = () => {
    toast.current.show({
      severity: 'warn',
      summary: 'Rejeitado',
      detail: 'Arquivo não deletado',
      life: 3000,
    });
    setTimeout(() => {
      setDeleteFile(false);
    }, 500);
  };


  const dialogDelet = () => {
    confirmDialog({
      message: 'Deseja excluir o arquivo?',
      header: 'Confirmar exclusão',
      acceptClassName: 'p-button-danger',
      accept,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      reject,
      onHide: () => setDeleteFile(false),
    });
  };

  function handleDeleteFile() {
    setDeleteFile(true);
    setTimeout(() => {
      dialogDelet();
    }, 500);
  }

  function handleDownload() {
    window.open(materials.file, '_blank', 'noopener noreferrer');
  }
  return (
    <>
      <div className="c-list">
        <img src={icon} alt="Ícone PDF" className="pdf" />
        <h2 className="list-title">Título: {materials.title}</h2>
        <p>Matéria: {materials.subject}</p>
        <div className="actions">
          <button className="btn-download-pdf" onClick={handleDownload}>
            Download
          </button>
          <span
            className="material-icons-sharp pdf-delete"
            onClick={handleDeleteFile}
          >
            delete
          </span>
        </div>
      </div>
      <Toast ref={toast} />
      {deleteFile && (
        <>
          <ConfirmDialog />
        </>
      )}
    </>
  );
};

ListPdf.propTypes = {
  materials: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};
