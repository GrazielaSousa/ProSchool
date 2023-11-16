import './materials.scss';
import { PropTypes } from 'prop-types';
import { CardPdf } from '../Cards/CardPdf.jsx';
import { useState, useEffect } from 'react';
import { useDegree } from '../../../context/UserDegre.jsx';
import api from '../../../api/api.js';

export const MaterialsPdf = ({ materials, onBackClick }) => {
  const [materialsExisting, setMaterialsExisting] = useState(false);
  const { degree } = useDegree();
  const handleBackClick = () => {
    onBackClick();
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      const result = await api.get(
        `/material/${materials.text}/${degree.toLowerCase()}`
      );
      setMaterialsExisting(result.data.data);
    };
    fetchMaterials();
  }, [materials.text, degree]);

  return (
    <>
      <div className="c-materials-pdf">
        <div className="c-button">
          <span className="material-icons-sharp back">arrow_back</span>
          <button onClick={handleBackClick} className="btn-back">
            Voltar
          </button>
        </div>
        {materialsExisting.length > 0 ? (
          <div className="c-card">
            {materialsExisting.map((material, index) => (
              <div className="c-title" key={index}>
                <CardPdf materials={material} />
              </div>
            ))}
          </div>
        ) : (
          <div className="c-title">
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
