import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,Label
} from 'recharts';

const data = [
  {
    date: '09-04', totalCases: 4000,
  },
  {
    date: '11-04', totalCases: 3000, 
  },
  {
    date: '16-04', totalCases: 2000, 
  }
 
];

export default class Graph extends PureComponent {

  render() {
    return (
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"/>
        <YAxis />
        <Tooltip />
        
        <Area type="monotone" dataKey="totalCases" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );
  }
}
