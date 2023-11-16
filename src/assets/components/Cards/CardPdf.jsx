import { useState } from 'react';
import { useEffect } from 'react';
import '../Materials/materials.scss';
import image from '../../../../public/image.svg';
import { Document, Page, pdfjs } from 'react-pdf';
import { PropTypes } from 'prop-types';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const CardPdf = ({ materials }) => {
  // Pegar os dados do banco de dados
  const [viewImagePdf, setViewImagePdf] = useState(true);
  const [numPages, setNumPages] = useState(null);

  const imagePdf = materials.file;

  useEffect(() => {
    if (imagePdf) {
      setViewImagePdf(true);
    } else {
      setViewImagePdf(false);
    }
  }, []);

  function handleDownload() {
    window.open(imagePdf, '_blank', 'noopener noreferrer');
  }

  return (
    <>
      <div className="card" onClick={handleDownload}>
        <div className="c-card-item">
          <div className="c-card__body">
            {viewImagePdf ? (
              <Document
                file={imagePdf}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              >
                <Page pageNumber={1} width={280} />
              </Document>
            ) : (
              <div className="image-container">
                <img src={image} className="image-pdf" alt="Placeholder" />
              </div>
            )}
            <div className="icon-pdf">PDF</div>
          </div>
          <div className="pdf-title">
            <p className="card-text">{materials.title}</p>
          </div>
        </div>
      </div>
    </>
  );
};
CardPdf.propTypes = {
  materials: PropTypes.object.isRequired,
};
