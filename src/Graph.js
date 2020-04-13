import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
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
    console.log('look here',this.props.weekData);
    return (
      <AreaChart
        width={500}
        height={400}
        data={this.props.weekData}
        margin={{
          top: 10, right: 30, left: 0, bottom: 0,
        }}
      >
      
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={this.props.XAxisDatakey}/>
        <YAxis />
        <Tooltip />
        
        <Area type="monotone" dataKey={this.props.AreaDataKey} stroke="#2768e9" fill={this.props.fill} />
      </AreaChart>
    );
  }
}
