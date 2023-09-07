import PropTypes from 'prop-types'; // Importe o PropTypes para definir tipos de propriedades
import './card_description.scss';

function CardDescription(props) {
  const { src, className, alt } = props;

  return (
    // <div className="cards-container">
    <div className="item">
      <div className="icon-span">
        <div className={`circle ${className}`}>
          <img src={src} alt={alt} className="svg-image" />
        </div>
        <span>{alt}</span>
      </div>
      <span className="nota">
        8.0<h6 className="nota-default">/10</h6>
      </span>
    </div>
    // </div>
  );
}

// Defina os tipos esperados para as props usando PropTypes
CardDescription.propTypes = {
  src: PropTypes.string.isRequired, // src deve ser uma string (caminho da imagem)
  className: PropTypes.string, // className é opcional, mas se for fornecido, deve ser uma string
  alt: PropTypes.string.isRequired, // alt deve ser uma string (texto alternativo para a imagem)
};

export default CardDescription;
