import './materials.scss';
import { PropTypes } from 'prop-types';
import { CardPdf } from '../Cards/CardPdf.jsx';
import { useState } from 'react';

export const MaterialsPdf = ({ materials, onBackClick }) => {
  // Alterar de acordo com o retorno do GET no MONGODB
  const [materialsExisting, setMaterialsExisting] = useState(true);

  const handleBackClick = () => {
    onBackClick();
  };

  return (
    <>
        <div className="c-materials-pdf">
          <div className="c-button">
            <span className="material-icons-sharp back">arrow_back</span>
            <button onClick={handleBackClick} className="btn-back">
              Voltar
            </button>
          </div>
      {materialsExisting ? (
          <div className="c-card">
            <CardPdf materials={materials} />
            <CardPdf materials={materials} />
            <CardPdf materials={materials} />
          </div>
      ) : (
        <div className= "c-title">
          <p className="title-not-pdf">Nenhum material foi disponibilizado</p>
        </div>
      )}
      </div>
    </>
  );
};

MaterialsPdf.propTypes = {
  materials: PropTypes.object.isRequired,
  onBackClick: PropTypes.func.isRequired,
};
