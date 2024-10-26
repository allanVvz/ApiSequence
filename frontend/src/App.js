import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ChartsDisplay from './ChartsDisplay';
import { Button, Box } from '@mui/material';
import axios from 'axios';

function App() {
  const [chartIndex, setChartIndex] = useState(0);

  const handleNextChart = () => {
    setChartIndex((prevIndex) => prevIndex + 1);
  };

  const handleGetData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/get-results');
      console.log(response.data);
      // Atualiza o estado com os dados recebidos
      setChartIndex(0); // Reinicia o índice do gráfico ao obter novos dados
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: 'black', color: 'white' }}>
      <header>
        <h1>Visualização de PGNs</h1>
        <FileUpload />
        <Button variant="contained" onClick={handleGetData} style={{ marginTop: '10px' }}>Buscar Dados</Button>
      </header>
      <Box mt={4} display="flex" justifyContent="space-around">
        <ChartsDisplay chartIndex={chartIndex} />
      </Box>
      <Box mt={4} textAlign="center">
        <Button variant="contained" onClick={handleNextChart}>Trocar de Gráfico</Button>
      </Box>
    </div>
  );
}

export default App;
