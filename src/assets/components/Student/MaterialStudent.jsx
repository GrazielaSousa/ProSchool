import './materials.scss';
import PropTypes from 'prop-types';
import { listMaterials } from './materials.js';


function MaterialStudent() {
  return (
    <div className='l-cards'>
      {listMaterials.map((material, index) => (
        <article className="cards" key={index}>
          <img src={material.src} alt={`Imagem ${index}`} className='images' />
          <p className='name-material'>{material.text}</p>
        </article>
      ))}
    </div>
  );
}

MaterialStudent.propTypes = {
  listMaterials: PropTypes.object,
};

export default MaterialStudent;
