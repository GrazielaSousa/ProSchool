import PropTypes from 'prop-types';
import './card_description.scss';
import { perform } from '../Perform/perfom.js';

function CardDescription() {
  return (
    <>
      {perform.map((material, index) => (
        <div key={index} className="item">
          <div key={index} className="icon-span">
            <div className={`circle ${material.className}`}>
              <img
                src={material.src}
                alt={material.text}
                className="svg-image"
              />
            </div>
            <span>{material.text}</span>
          </div>
          <span className="nota">
            {material.grade}
            <h6 className="nota-default">/10</h6>
          </span>
        </div>
      ))}
    </>
  );
}

// Defina os tipos esperados para as props usando PropTypes
CardDescription.propTypes = {
  src: PropTypes.string.isRequired, // src deve ser uma string (caminho da imagem)
  className: PropTypes.string, // className é opcional, mas se for fornecido, deve ser uma string
  alt: PropTypes.string.isRequired, // alt deve ser uma string (texto alternativo para a imagem)
};

export default CardDescription;
