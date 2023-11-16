/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from '@mui/x-charts';

function Metrics() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const [selectedValue, setSelectedValue] = useState(); // Valor por defecto


  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/metrics/${selectedYear}`);
        setData(response.data);

      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchMetrics();
  }, [selectedYear]);

  const handleChangeValue = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
  };


  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="select-value-label">Seleccionar Valor</InputLabel>
        <Select
          labelId="select-value-label"
          id="select-value"
          value={selectedValue}
          label="Seleccionar Valor"
          onChange={handleChangeValue}
        >
          <MenuItem value="monthly_distance_sum">Distancia Mensual Suma</MenuItem>
          <MenuItem value="monthly_weight_sum">Peso Mensual Suma</MenuItem>
          <MenuItem value="monthly_height_avg">Altura Mensual Promedio</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="select-year-label">Seleccionar Año</InputLabel>
        <Select
          labelId="select-year-label"
          id="select-year"
          value={selectedYear}
          label="Seleccionar Año"
          onChange={handleChangeYear}
        >
          {Array.from({ length: 9 }, (_, index) => 2015 + index).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <BarChart width={600} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={selectedValue} fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Metrics; */