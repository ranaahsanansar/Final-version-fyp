import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import {
    Box,
    Typography,
} from "@mui/material";


const COLORS = ['#0088FE', '#00C49F'];

const Chart = ({percent , remaning}) => {
    let data = [
        { name: 'Value 1', percentage: percent },
        { name: 'Value 2', percentage: remaning }
      ];

      console.log("yaha Data")
      console.log(percent , remaning)
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="percentage"
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        
      </Pie>
    </PieChart>
  );
};

export default Chart;
