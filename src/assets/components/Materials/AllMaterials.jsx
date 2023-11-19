import { useEffect, useState } from 'react';
import api from '../../../api/api.js';
import './materials.scss';
import { ListPdf } from '../List/ListPdf.jsx';
import SyncLoader from 'react-spinners/SyncLoader';

export const AllMaterials = () => {
  const [file, setFiles] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    allPdf();
  }, []);

  const allPdf = async () => {
    const response = await api.get('/files');
    setFiles(response.data.data);
  };

  const deleteFileAndUpdateList = async (id) => {
    await api.delete(`/deleteFile/${id}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    allPdf();
  };
  return (
    <div className="c-card" style={{justifyContent:'center'}}>
      {loading ? ( 
        <div style={{display: 'flex', height: '450px', alignItems: 'center'}} >
          <SyncLoader loading={loading} color="#828DD9" size={20} style={{padding: '2rem'}} />
        </div>
      ) : file != null && file.length > 0 ? (
        file.map((data) => (
          <ListPdf
            key={data.id}
            materials={data}
            onDelete={deleteFileAndUpdateList}
          />
        ))
      ) : (
        <div className="c-title" style={{ width: '100vw' }}>
          <p className="title-not-pdf">Nenhum material foi disponibilizado</p>
        </div>
      )}
    </div>
  );
};
