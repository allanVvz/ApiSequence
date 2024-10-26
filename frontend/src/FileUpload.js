// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Por favor, selecione um arquivo primeiro.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:7777/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage(response.data.message);
    } catch (error) {
      setUploadMessage('Erro ao enviar o arquivo. Tente novamente.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Envio de Arquivo CSV</h2>
      <input type="file" onChange={handleFileChange} accept=".csv" />
      <button onClick={handleUpload}>Enviar</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
};

export default FileUpload;
