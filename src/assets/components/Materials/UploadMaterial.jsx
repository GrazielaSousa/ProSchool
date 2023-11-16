import '../Register/formsRegister.scss';
import { useState, useEffect } from 'react';
import { listMaterials } from './../Student/materials';
import api from './../../../api/api';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const templateData = {
  title: '',
  degree: '',
  subject: '',
  file: '',
};

export const UploadMaterial = () => {
  // Array de matérias sem duplicatas
  const allMaterials = listMaterials.fundamental.concat(listMaterials.medio);
  const allMaterialsNotDuplicate = new Set(
    allMaterials.map((item) => item.text)
  );
  const allMaterialsNotDuplicateArray = [...allMaterialsNotDuplicate];
  const [formData, setFormData] = useState(templateData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectDegree, setSelectedDegree] = useState('');
  const [selectSubject, setSelectedSubject] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');

  const getMaterialsByDegree = (degree) => {
    return degree === 'fundamental' ? listMaterials.fundamental : listMaterials.medio;
  };

  const availableMaterials = getMaterialsByDegree(selectDegree);


  const handleFileChange = (e, fieldName) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setSelectedFileName(selectedFile.name);
      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        [fieldName]: true,
      }));
    }
  };

  const [fieldValidations, setFieldValidations] = useState({
    title: false,
    degree: false,
    subject: false,
    file: false,
  });

  useEffect(() => {
    if (
      fieldValidations.title &&
      fieldValidations.degree &&
      fieldValidations.subject &&
      fieldValidations.file
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [fieldValidations]);

  const handleOptionChange = (e, fieldName) => {
    if (fieldName === 'degree') {
      setSelectedDegree(e.target.value);
    } else if (fieldName === 'subject') {
      setSelectedSubject(e.target.value);
    }
  };

  const removeFile = () => {
    setFile('');
    setSelectedFileName('');
  };

  const handleBlur = (e, fieldName) => {
    const span = e.target.parentNode.querySelector(
      '.material-icons-sharp.emergency'
    );
    const value = e.target.value;

    if (value === '') {
      span.classList.add('error');
      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        [fieldName]: false,
      }));
    } else {
      span.classList.remove('error');
      setFieldValidations((prevValidations) => ({
        ...prevValidations,
        [fieldName]: true,
      }));
    }
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();

    if (!file || !title || !selectDegree || !selectSubject) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    var form = new FormData();
    form.append('file', file);
    form.append('title', title);
    form.append('degree', selectDegree);
    form.append('subject', selectSubject);

    await api
      .post('/uploads', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Flip}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        encType="multipart/form-data"
        method="post"
      >
        <div className="c-form-subject">
          <div className="forms-register">
            <label htmlFor="title" className="label-register">
              Título
              <span className="material-icons-sharp emergency">emergency</span>
            </label>
            <input
              style={{ minWidth: '480px', maxWidth: '600px' }}
              type="text"
              name="title"
              id="title"
              className="input-register"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={(e) => handleBlur(e, 'title')}
            />
          </div>

          <div className="forms-register">
            <label htmlFor="degree" className="label-register">
              Escolaridade
              <span className="material-icons-sharp emergency">emergency</span>
            </label>
            <select
              type="text"
              name="degree"
              id="degree"
              className="select-register"
              required
              value={selectDegree}
              onChange={(e) => handleOptionChange(e, 'degree')}
              onBlur={(e) => handleBlur(e, 'degree')}
            >
              <option value="" disabled>
                Selecione a Escolaridade
              </option>
              <option value="fundamental">Fundamental</option>
              <option value="medio">Médio</option>
            </select>
          </div>

          <div className="forms-register">
            <label htmlFor="subject" className="label-register">
              Matéria
              <span className="material-icons-sharp emergency">emergency</span>
            </label>
            <select
              style={{ minWidth: '480px', maxWidth: '600px' }}
              type="text"
              name="subject"
              id="subject"
              className="select-register"
              required
              value={selectSubject}
              onChange={(e) => handleOptionChange(e, 'subject')}
              onBlur={(e) => handleBlur(e, 'subject')}
            >
              <option value="" disabled>
                Selecione a Escolaridade
              </option>
              {availableMaterials.map((item) => (
                <option key={item.text} value={item.text}>
                  {item.text}
                </option>
              ))}
            </select>
          </div>

          <div className="forms-register">
            <label htmlFor="file" className="label-register">
              Anexo
              <span className="material-icons-sharp emergency">emergency</span>
            </label>
            <label className="file-container">
              <input
                type="file"
                name="file"
                className="input-register"
                required
                onChange={(e) => handleFileChange(e, 'file')}
                onBlur={(e) => handleBlur(e, 'file')}
              />
              <span
                className={selectedFileName ? 'file-name-sucess' : 'file-name'}
              >
                {selectedFileName || 'Selecionar anexo'}
              </span>
              {selectedFileName && (
                <span
                  className="material-icons-sharp close"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFile();
                  }}
                >
                  close
                </span>
              )}
              {!selectedFileName && (
                <span className="material-icons-sharp add">add</span>
              )}
            </label>
          </div>
        </div>
        <div className="submit">
          <button
            type="submit"
            className="btn-upload"
            onClick={handleSubmitFile}
          >
            <span className="material-icons-sharp">check_circle</span> Anexar
            arquivo
          </button>
        </div>
      </form>
    </div>
  );
};
