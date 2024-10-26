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

const ChartsDisplay = () => {
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    // Função para buscar os dados do GET
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:7777/get-results');
        if (response.data.results) {
          setDataSets(response.data.results);
        } else {
          console.error('Nenhum dado disponível.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Gráficos de PGNs</h2>
      {dataSets.length === 0 ? (
        <p>Nenhum dado disponível para plotar.</p>
      ) : (
        dataSets.map((dataSet, index) => (
          <div key={index} style={{ marginBottom: '50px' }}>
            <h3>PGN: {dataSet.pgn}</h3>
            <Line
              data={{
                labels: dataSet.sequence.map((_, idx) => idx + 1), // Eixo X - Índices da sequência
                datasets: [
                  {
                    label: `Byte - ${dataSet.byte}`,
                    data: dataSet.sequence,
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
                    text: `Gráfico para PGN ${dataSet.pgn}`,
                  },
                },
              }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ChartsDisplay;
