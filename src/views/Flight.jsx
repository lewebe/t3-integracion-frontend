import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBDataTable } from 'mdbreact';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';


function Flight() {
    const { flightNumber } = useParams();
    const [originCoordinates, setOriginCoordinates] = useState([0, 0]);
    const [destinationCoordinates, setDestinationCoordinates] = useState([0, 0]);
    const [originData, setOriginData] = useState('');
    const [destinationData, setDestinationData] = useState('');
    const [flightData, setFlightData] = useState('');
  const [passengersData, setPassengersData] = useState({
    columns: [
      {
        label: 'Avatar',
        field: 'avatar',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Nombre',
        field: 'firstName',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Apellido',
        field: 'lastName',
        sort: 'asc',
        width: 200,
      },
      {
        label: 'Edad',
        field: 'age',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Genero',
        field: 'gender',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Altura (cm)',
        field: 'height',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Peso (kg)',
        field: 'weight',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'N° de asiento',
        field: 'seatNumber',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'N° de asiento',
        field: 'seatNumber',
        sort: 'asc',
        width: 100,
      },
    ],
    rows: [],
  });
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/flight/${flightNumber}`);
        console.log('response:', response.data);
        const firstUser = response.data[0];

        // Extraer los atributos lat_origin y lon_origin
        const { lat_origin, lon_origin, lat_destination, lon_destination } = firstUser;
        console.log('lat_origin:', lat_origin);

      // Convertir a floats y almacenar en originCoordinates
        setOriginCoordinates([parseFloat(lat_origin), parseFloat(lon_origin)]);
        setDestinationCoordinates([parseFloat(lat_destination), parseFloat(lon_destination)]);

        const { airportIATA_origin, name_origin, city_origin, country_origin } = firstUser;
        const originString = `IATA: ${airportIATA_origin}\n${name_origin}\n${city_origin}\n${country_origin}`;
        setOriginData(originString);

        const { airportIATA_destination, name_destination, city_destination, country_destination } = firstUser;
        const destinationString = `IATA: ${airportIATA_destination}\n${name_destination}\n${city_destination}\n${country_destination}`;
        setDestinationData(destinationString);
        
        const { airline, name, aircraftType, distance } = firstUser;
        const flightString = `Aerolinea: ${airline}\nNombre del avión: ${name}\nTipo de avión: ${aircraftType}\nDistancia (km): ${distance}`;
        setFlightData(flightString);

        const responsePassengersData = response.data.map(user => ({
            avatar: <img src={user.avatar} alt="Avatar" />,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            gender: user.gender,
            height: user['height(cm)'],
            weight: user['weight(kg)'],
            seatNumber: user.seatNumber,
          }));
        setPassengersData((prevData) => ({ ...prevData, rows: responsePassengersData }));

      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, [flightNumber]);


  return (
      <div class="d-flex flex-column gap-2">
        <div>
            <h1> Vuelo {flightNumber}</h1>
        </div>
        <div>
            <MapContainer
            center={[0, 0]} // Coordenadas centrales genéricas
            zoom={2}
            style={{ height: "50vh", width: "100%" }}
            >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Marcador para origen*/}
            <Marker position={originCoordinates}>
                <Popup>
                <div className="text-center">
                    <p><pre>{originData}</pre></p>
                </div>
                </Popup>
            </Marker>

            {/* Otro marcador para destino */}
            <Marker position={destinationCoordinates}>
                <Popup>
                <div className="text-center">
                    <p><pre>{destinationData}</pre></p>
                </div>
                </Popup>
            </Marker>

            {/* Línea entre los dos marcadores */}
            <Polyline
                positions={[originCoordinates, destinationCoordinates]}
                color="blue"
            >
                <Popup>
                <div className="text-center">
                    <p><pre>{flightData}</pre></p>
                </div>
                </Popup>
            </Polyline>
            </MapContainer>
        </div>
            <div>
            <h2> Pasajeros </h2>
            </div>
             <div>
                <MDBDataTable
                striped
                bordered
                small
                data={passengersData}
                entries={15}
                />
            </div>
      </div>
      );
}

export default Flight;