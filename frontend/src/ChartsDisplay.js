import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartsDisplay = ({ chartData }) => {
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    // Função para buscar os dados do GET
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get-results');
        if (response.data.results) {
          setDataSets(response.data.results);
          console.log('Dataset completo:', response.data.results);

          // Imprime cada linha individualmente
          response.data.results.forEach((dataSet, index) => {
            console.log(`Linha ${index + 1}:`, dataSet);
          });
        } else {
          console.error('Nenhum dado disponível.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  if (!chartData) {
    return <p>Nenhum dado disponível para plotar.</p>;
  }

  return (
    <div>
      <h2>Gráficos de PGNs</h2>
      <div style={{ marginBottom: '50px' }}>
        <h3>PGN: {chartData.pgn}</h3>
        <Line
          data={{
            labels: chartData.sequence.map((_, idx) => idx + 1), // Eixo X - Índices da sequência
            datasets: [
              {
                label: `Byte - ${chartData.byte}`,
                data: chartData.sequence,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Gráfico para PGN ${chartData.pgn}`,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartsDisplay;
