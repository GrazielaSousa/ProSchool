import { useState } from 'react';
import { useEffect } from 'react';
import '../Materials/materials.scss';
import { Document, Page, pdfjs } from 'react-pdf';
import { PropTypes } from 'prop-types';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const CardPdf = ({ materials }) => {
  const [viewImagePdf, setViewImagePdf] = useState(false);
  const [numPages, setNumPages] = useState(null);

  const imagePdf = materials.file;

  useEffect(() => {
    if (imagePdf) {
      setViewImagePdf(true);
    } else {
      setViewImagePdf(false);
    }
  }, [imagePdf]);

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
                loading={<Skeleton width={420} height={420} />}
              >
                <Page pageNumber={1} width={280} />
              </Document>
            ) : (
              <Skeleton width={420} height={420} />
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
