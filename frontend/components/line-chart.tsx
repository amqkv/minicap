import { Box } from '@chakra-ui/react';
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    name: 'Page A',
    temperature: 4000,
    weight: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    temperature: 3000,
    weight: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    temperature: 2000,
    weight: 9800,
  },
];

export default class ChartFormat extends PureComponent {

  render() {
    return (
      <Box width="50%" height="50%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
        </LineChart>
      </Box>
    );
  }
}
