import { useState } from 'react';
import { useEffect } from 'react';
import pdfUrl from '../../../../public/Entendendo Algoritmos_ Um guia ilustrado para programadores e outros curiosos.pdf';
import '../Materials/materials.scss';
import image from '../../../../public/image.svg';
import { PropTypes } from 'prop-types';

export const CardPdf = ({ materials }) => {
  const [viewImagePdf, setViewImagePdf] = useState(false);

  const imagePdf =
    'https://www.papeldeparede.etc.br/fotos/wp-content/uploads/lunakino_ru_iceage3_-_177-1280x1024.jpg';
  // const imagePdf = null;

  useEffect(() => {
    if (imagePdf) {
      setViewImagePdf(true);
    } else {
      setViewImagePdf(false);
    }
  }, []);

  function handleDownload() {
    window.open(pdfUrl, '_blank');
    console.log('clicou?');
  }

  return (
    <>
      <div className="card" onClick={handleDownload}>
        <div
          className="c-card-item"
          style={imagePdf ? { backgroundImage: `url(${imagePdf})` } : {}}
        >
          <div className="c-card__body">
            <div className="icon-pdf">PDF</div>
          </div>

          {!viewImagePdf && (
            <img
              src={image}
              className="image-pdf"
              style={{
                position: 'relative',
                top: '-2%',
                left: '30%',
                width: '100px',
              }}
            />
          )}
          <div className="pdf-title">
            <p className="card-text">
              {materials.text} Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Nam optio blanditiis, totam eveniet quasi
              accusantium! Praesentium asperiores accusamus nemo doloremque
              provident facilis, deserunt quibusdam optio quasi hic, et labore
              repellat.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
CardPdf.propTypes = {
  materials: PropTypes.object.isRequired,
};
