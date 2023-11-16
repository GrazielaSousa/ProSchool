import './materials.scss';
import PropTypes from 'prop-types';
import { listMaterials } from './materials.js';
import { useState } from 'react';
import { MaterialsPdf } from '../Materials/MaterialsPdf.jsx';
import { useDegree } from '../../../context/UserDegre.jsx';
export const MaterialStudent = () => {
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showPDF, setShowPDF] = useState(false);
  const { degree } = useDegree();

  let materials;

  if(degree === 'fundamental'){
    materials = listMaterials.fundamental;
  } else {
    materials = listMaterials.medio;
  }


  const handleBackClick = () => {
    setShowPDF(false);
    setSelectedMaterial(null);
  };

  const handleMaterialClick = async (material) => {
    setSelectedMaterial(material);
    setShowPDF(true);
  };

  return (
    <div>
      {showPDF ? (
          <MaterialsPdf
            materials={selectedMaterial}
            onBackClick={handleBackClick}
          />
        ) : (
        <div className="l-cards">
          {materials.map((material, index) => (
            <article
              className="cards"
              key={index}
              onClick={() => handleMaterialClick(material)}
            >
              <img
                src={material.src}
                alt={`Imagem ${index}`}
                className="images"
              />
              <p className="name-material">{material.text}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

MaterialStudent.propTypes = {
  listMaterials: PropTypes.object,
};
