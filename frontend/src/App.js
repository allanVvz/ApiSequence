import React, { useState, useEffect } from 'react';
import FileUpload from './FileUpload';
import ChartsDisplay from './ChartsDisplay';
import { Button, Box } from '@mui/material';
import axios from 'axios';

function App() {
  const [dataSets, setDataSets] = useState([]);
  const [chartIndex, setChartIndex] = useState(0);

  useEffect(() => {
    // Função para buscar dados do GET
    const handleGetData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get-results');
        if (response.data.results) {
          setDataSets(response.data.results);
          setChartIndex(0); // Reinicia o índice do gráfico ao obter novos dados
        } else {
          console.error('Nenhum dado disponível.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    handleGetData();
  }, []);

  // Função para trocar para o próximo gráfico
  const handleNextChart = () => {
    if (dataSets.length > 0) {
      setChartIndex((prevIndex) => (prevIndex + 1) % dataSets.length);
    }
  };

  return (
    <div className="App" style={{ backgroundColor: 'black', color: 'white' }}>
      <header>
        <h1>Visualização de PGNs</h1>
        <FileUpload />
        <Button variant="contained" onClick={() => window.location.reload()} style={{ marginTop: '10px' }}>
          Buscar Dados
        </Button>
      </header>
      <Box mt={4} display="flex" justifyContent="space-around">
        {dataSets.length > 0 && (
          <ChartsDisplay chartData={dataSets[chartIndex]} />
        )}
      </Box>
      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          onClick={handleNextChart}
          disabled={dataSets.length === 0} // Desabilita botão se não houver dados
        >
          Trocar de Gráfico
        </Button>
      </Box>
    </div>
  );
}

export default App;
