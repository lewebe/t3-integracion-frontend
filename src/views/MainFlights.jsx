import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

function MainFlights() {
  const [data, setData] = useState({
    columns: [
      {
        label: 'N° de vuelo',
        field: 'flightNumber',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Aeropuerto origen',
        field: 'airportIATA_origin',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Aeropuerto destino',
        field: 'airportIATA_destination',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Promedio de edad de pasajeros',
        field: 'avg_edad',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Distancia recorrida (km)',
        field: 'distance',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Cantidad de pasajeros',
        field: 'passenger_count',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Aerolinea',
        field: 'airline',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'año',
        field: 'año',
        sort: 'asc',
        width: 100,

      },
      {
        label: 'mes',
        field: 'mes',
        sort: 'asc',
        width: 100,

      },
    ],
    rows: [],
  });
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/flights`);
        console.log('response:', response.data);
        /* setData((prevData) => ({ ...prevData, rows: response.data})); */

        const modifiedRows = response.data.map((row) => ({
          ...row,
          flightNumber: <Link to={`flight/${row.flightNumber}`}>{row.flightNumber}</Link>,
        }));
        setData((prevData) => ({ ...prevData, rows: modifiedRows }));

      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  console.log('data:', data);
  return (
      <div>
        <h1>Vuelos</h1>
        <h3>(Has click en el número de vuelo que quieras ver)</h3>
        <h4> También puedes ocupar el buscador de la tabla o ordenar asc y desc por header</h4>
        <MDBDataTable
        striped
        bordered
        small
        data={data}
        entries={15}
        />
      </div>
      );
}

export default MainFlights;