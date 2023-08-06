import React, { useState, useEffect } from 'react';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Effectuer la requête pour récupérer les données depuis l'API
    fetch('http://127.0.0.1:8000/manager/api/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Erreur lors de la récupération des données:', error));
  }, []);

  return (
    <div>
      <h2>Données du tableau</h2>
      <table>
        <thead>
          <tr>
            <th>Méthode</th>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.meth}</td>
              <td>{item.types.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;